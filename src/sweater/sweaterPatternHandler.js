'use strict';

function getSweaterPattern(request) {
	console.log('calculating sweater pattern');

	const measurements = request.body.measurements;
	const rowsPerInch = request.body.swatch.rowsPerInch;
	const stitchesPerInch = request.body.swatch.stitchesPerInch;
	const ribRepeat = request.body.ribRepeat;

	const collarStitches = divideForBodyAndSleeves(measurements, stitchesPerInch, ribRepeat);
	const totalCastOnStitches = collarStitches.totalCount;
	const backBodyStitches = collarStitches.body / 2;

	const neckRaise = getNeckRaiseCounts(stitchesPerInch, rowsPerInch);
	const shoulderIncreaseStitchCount = getShoulderIncreaseCount(measurements, rowsPerInch);

	const underArmCastOn = calculateUnderArmCastOn(collarStitches.body, stitchesPerInch, measurements, rowsPerInch);
	const torsoRowCount = getSweaterTorsoRowCount(measurements, rowsPerInch);

	const sleeveLengthBeforeDecreases = getNoDecreaseSleeveLength(measurements, rowsPerInch);
	const numberOfSleeveDecreases = calculateNumberOfDecreasesSleeve(collarStitches.arm, measurements, stitchesPerInch, rowsPerInch);
	const sleeveDecreaseRate = calculateSleeveDecreaseRate(sleeveLengthBeforeDecreases, numberOfSleeveDecreases);


	const pattern = {
		description: "This is a basic top down seamless raglan sweater pattern with ribbing at the collar, cuffs, and hem. It can be knit in any stitch as long as the" +
		"gauge is measured accurately, just work in stitch pattern instead of knit stitch.",
		instructions: {
			neck: `CO ${totalCastOnStitches} stitches. Knit in ${ribRepeat} rib for 2 inches.`,
			placeMarkers: `Knit ${backBodyStitches}, place marker. Knit ${collarStitches.arm}, place marker. Knit ${collarStitches.body}, place marker. Knit ${collarStitches.arm}, place marker. Knit to BOR.`,
			neckRaise: `Knit ${neckRaise.neckRaiseFirstKnitRowStitchCount} . Wrap and turn. Purl ${neckRaise.neckRaiseFirstPurlRowStitchCount}. Wrap and turn. Knit to wrapped stitch, pick up wrap and knit with stitch, knit ${neckRaise.neckRaiseSubsequentStitchCount}, wrap and turn. Repeat rows this way ${neckRaise.rowsToRepeat} times. End on a knit row and knit back to BOR.`,
			shoulders: `Knit to marker, m1r, slip marker, m1l. Repeat for other stitch markers. Next round: knit. Repeat these two rounds ${shoulderIncreaseStitchCount} times.`,
			body: `Knit to arm stitches, put arm stitches on waste yarn to hold for later. CO ${underArmCastOn} at the underarm using a cable cast on. Knit across body stitches until the next arm is reached then repeat the process as for the other arm. Knit for ${torsoRowCount} rows then knit in ${ribRepeat} rib for two inches and bind off.`,
			sleeves: `Pick up stitches from waste yarn. Pick up and knit the ${underArmCastOn} stitches from the underarm cast on. Knit for ${sleeveLengthBeforeDecreases} rows then decrease 2 stitches every ${sleeveDecreaseRate} rows ${numberOfSleeveDecreases} times. Knit ${ribRepeat} ribbing for 2" and bind off.`
		}
	}

	return pattern.instructions;
}

function getNeckRaiseCounts(stitchesPerInch, rowsPerInch) {
	return {
		neckRaiseFirstKnitRowStitchCount: stitchesPerInch * 2,
		neckRaiseFirstPurlRowStitchCount: stitchesPerInch * 4,
		neckRaiseSubsequentStitchCount: Math.round(stitchesPerInch * 0.5),
		rowsToRepeat: Math.round(1.5 * rowsPerInch)
	}
}

/*
* Calculates how many times to do the sleeve and body increases for the raglan.
* @param underArmHeight
* @param rowsPerInch
* @return int
*/
function getShoulderIncreaseCount(measurements, rowsPerInch) {
	const underArmHeight = measurements.heightFromUnderarms;
	return Math.round(underArmHeight * rowsPerInch);
}

/*
* @param neckMeasurement - measurement of neck in inches
* @param stitchesPerInch - number of knit stitches per inch, taken from swatch
* @return {obj}
*/
function divideForBodyAndSleeves(measurements, stitchesPerInch, ribRepeat) {
	const neckMeasurement = measurements.neck;
	// Adding three inches to the neck measurement so it fits over your head.
	const neckMeasurementWithEase = neckMeasurement + 3;

	let ballparkCollarStitchCount = Math.round(neckMeasurementWithEase * stitchesPerInch);

	// Round up because you cant have a half stitch, and its better to provide a little more ease than less ease in the neck
	let bodyStitches = Math.round(ballparkCollarStitchCount * 0.39);
	const armStitches = Math.round(ballparkCollarStitchCount * 0.11);

	// Make sure the total stitch count is divisible by the rib repeat
	let totalStitches = bodyStitches * 2 + armStitches * 2;
	const ribRepeatStitchCount = parseInt(ribRepeat.charAt(0)) * 2;
	const isDivisibleByRibRepeat = totalStitches % ribRepeatStitchCount;
	if(isDivisibleByRibRepeat !== 0) {
		 totalStitches = totalStitches + 2;
		 bodyStitches = bodyStitches + 1
	}

	const collarStitches = {
		totalCount: totalStitches,
		arm: armStitches,
		body: bodyStitches
	}
	return collarStitches;

}

/*
* Gets the number of rows the sweater body needs to be worked.
* @param measurements
* @param rowsPerInch
* @returns int
*/
function getSweaterTorsoRowCount(measurements, rowsPerInch) {
	// Also subtract 2 inches for the bottom ribbing at the hem of the sweater
	const torsoMeasurement = measurements.torso - measurements.heightFromUnderarms - 2;
	const rowCount = torsoMeasurement * rowsPerInch;
	return Math.round(rowCount);
}

/*
* Calculate the number of decreases the sleeve needs
* @param collarStitchesAtSleeve
* @param wristMeasurement
* @param stitchesPerInch
* @returns int
*/
function calculateNumberOfDecreasesSleeve(collarStitchesAtSleeve, measurements, stitchesPerInch, rowsPerInch) {
	const startingStitches = getTotalStitchCountForSingleSection(collarStitchesAtSleeve, measurements, rowsPerInch);
	let endingStitches = measurements.wrist * stitchesPerInch;
	endingStitches = Math.round(endingStitches);
	const numberOfDecreases = startingStitches - endingStitches;
	return numberOfDecreases;
}

function calculateSleeveDecreaseRate(noDecreaseSleeveLength, numberOfDecreases) {
	const decreaseSpacing = numberOfDecreases / noDecreaseSleeveLength;
	return Math.round(decreaseSpacing);
}

function getNoDecreaseSleeveLength(measurements, rowsPerInch) {
	const armWithoutCuffLength = (measurements.armLength - 2) * rowsPerInch;
	const amountToKnitWithoutDecreasing = armWithoutCuffLength / 2;
	return Math.round(amountToKnitWithoutDecreasing);
}

function calculateUnderArmCastOn(bodyStartingStitchCount, stitchesPerInch, measurements, rowsPerInch) {
	// Four body increases per every 2 rows
	const halfOfBody = getTotalStitchCountForSingleSection(bodyStartingStitchCount, measurements, rowsPerInch);
	const totalBodyStitches = halfOfBody * 2;
	const desiredBodyStitches = measurements.torso * stitchesPerInch;
	const totalAmountToCastOn = desiredBodyStitches - totalBodyStitches;
	let castOnPerArm = totalAmountToCastOn / 2;
	castOnPerArm = Math.round(castOnPerArm);
	return castOnPerArm
}

/* Function takes the stitches that a section (e.g. the arm) started with at the collar
 * and returns the number of stitches in that section once the shoulder decreases are finished.
 * @param startingCollarStitches
 * @return {int}
 */
function getTotalStitchCountForSingleSection(startingCollarStitches, measurements, rowsPerInch) {
	// There are two increases per two rows for both the sleeve and the body sections of the sweater.  
	let shoulderIncreases = (measurements.heightFromUnderarms / 2) * rowsPerInch;
	shoulderIncreases = Math.round(shoulderIncreases);
	const totalStitches = startingCollarStitches + shoulderIncreases;
	return totalStitches;
}

module.exports = {
	getSweaterPattern: getSweaterPattern,
	getNeckRaiseCounts: getNeckRaiseCounts,
	getShoulderIncreaseCount: getShoulderIncreaseCount,
	divideForBodyAndSleeves: divideForBodyAndSleeves,
	getSweaterTorsoRowCount: getSweaterTorsoRowCount,
	calculateNumberOfDecreasesSleeve: calculateNumberOfDecreasesSleeve,
	calculateSleeveDecreaseRate: calculateSleeveDecreaseRate,
	getNoDecreaseSleeveLength: getNoDecreaseSleeveLength,
	calculateUnderArmCastOn: calculateUnderArmCastOn,
	getTotalStitchCountForSingleSection: getTotalStitchCountForSingleSection
};