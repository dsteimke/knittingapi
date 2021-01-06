'use strict';

const InternalServerError = require('../error/InternalServerError');

function getSockPattern(request) {
	console.log('calculating sock pattern');

	const stitchesPerInch = request.body.swatch.stitchesPerInch;

	const footCircumference = request.body.measurements.footCircumference;
	// Cut off at 1 decimal place in case someone put in something stupid
	const footLength = request.body.measurements.footLength.toFixed(1);
	const ribRepeat = request.body.ribRepeat;

	const totalSockStitches = getTotalSockStitchCount(stitchesPerInch, footCircumference);
	const ankleLength = getAnkleLength(footLength);
	const heelStitchCount = getHeelStitchCount(totalSockStitches);
	const heelShapingCount = getHeelShapingStitchCount(totalSockStitches);
	const toeStitchCount = getToeStitchCount(totalSockStitches);

	const pattern = {
		description: "A top down basic stockinette sock pattern.",
		instructions: {
			cuff: `CO ${totalSockStitches} stitches. Work in ${ribRepeat} ribbing until cuff measures one inch.`,
			ankle: `Knit in the round for ${ankleLength} inches`,
			heel: `Work across first ${heelStitchCount} in heel stitch (knit 1 slip 1). Turn work. Repeat last row for 2 inches. Row 1: Knit ${heelShapingCount} across heel, ssk, w&t. Row 2: Purl 6 stitches, k2tog, w&t. Row 3: Knit to wrapped stitch, pick up wrap and knit together with stitch, ssk, w&t. Row 4: Purl to wrapped stitch, pick up wrap and knit together with stitch, k2tog, w&t. Repeat rows 3 and 4 until you come to the end of the heel, ending on a knit row. Pick up and knit 1 stitch for every row along the heel gusset. Knit across cuff stitches, then pick up and knit across 1 stitch for every row along the heel gusset on the other side. Knit one round.`,
			heelDecreases: `Knit in the round until you come to the heel gusset stitches, then K2tog. Knit until you come to the heel gusset stitches on the other side then ssl to decrease 2 stitches. Continue in this pattern decreasing every round until there are ${totalSockStitches} on the needles.`,
			foot: `Knit in the round until the sock measures ${footLength - 2} inches.`,
			toe: `Row 1: K1, SSK, K ${toeStitchCount}, K2Tog, K1. Repeat once to BOR. Row 2: Knit. Repeat rows 1 and 2 until sock measures 1 inch less than the desired length. Then repeat row 1 until there are 9 stitches left on the needle. Graft the toe stitches together.`
		}
	}

	return pattern.instructions;
}

/*
* Gets the stitch count of half the toe stitches minus the decrease stitches
* @param totalSockStitches
* @return int
*/
function getToeStitchCount(totalSockStitches) {
	const toeStitchCount = (totalSockStitches - 12) / 2;
	// Math was done earlier to make sure this was divisible by 2; if it's not something went seriously wrong.
	if (!Number.isInteger(toeStitchCount)) {
		throw new InternalServerError();
	}
	return toeStitchCount;
}

function getAnkleLength(footLength) {
	return Math.round(footLength * 0.75)
}

/*
* Gets the total number of stitches for the sock. Makes sure it's an even number for future maths.
* @param stitchesPerInch
* @param footCircumference
* @return int
*/
function getTotalSockStitchCount(stitchesPerInch, footCircumference) {
	let totalStitches = stitchesPerInch * footCircumference;
	totalStitches = Math.round(totalStitches);
	if(totalStitches % 2 === 1) {
		totalStitches ++;
	}
	return totalStitches;
}

/*
* Gets the stitch count needed to start the heel gusset
* @param totalSockStitches
* @return int
*/
function getHeelStitchCount(totalSockStitches) {
	const heelStitchCount = totalSockStitches / 2;
	// Math was done previously to make sure this would be an integer; if it's not something went wrong.
	if(!Number.isInteger(heelStitchCount)) {
		throw new InternalServerError();
	}
	return heelStitchCount;
}

/*
* Gets the stitches you need to knit before you can do the first heel shaping stitches
* @param totalSockStitches
* @return int
*/
function getHeelShapingStitchCount(totalSockStitches) {
	const quarterOfHeelStitches = totalSockStitches / 4;
	const heelStitches = Math.round(quarterOfHeelStitches);
	const stitchesToKnitBeforeShaping = heelStitches + 2;
	return stitchesToKnitBeforeShaping;
}

module.exports = {
	getSockPattern: getSockPattern,
	getAnkleLength: getAnkleLength,
	getToeStitchCount: getToeStitchCount,
	getTotalSockStitchCount: getTotalSockStitchCount,
	getHeelShapingStitchCount: getHeelShapingStitchCount,
	getHeelStitchCount: getHeelStitchCount
};
