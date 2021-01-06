'use strict';

const InternalServerError = require('../error/InternalServerError');

function getMittenPattern(request) {
	console.log('calculating mitten pattern');

	const stitchesPerInch = request.body.swatch.stitchesPerInch;
	const rowsPerInch = request.body.swatch.rowsPerInch;
	const ribRepeat = request.body.ribRepeat;
	const measurements = request.body.measurements;

	const totalStitchCount = getCastOn(measurements.handCircumference, stitchesPerInch, ribRepeat);

	const wristToThumbRows = getWristToThumbRows(measurements, rowsPerInch);

	const thumbStitches = calculateThumbStitches(stitchesPerInch, measurements.thumbCircumference);

	const stitchesToSetAsideForThumb = Math.round(thumbStitches / 2);

	const rowsToKnitBeforeDecreasing = calculateWhenToStartDecreases(rowsPerInch, measurements.handLength)

	const numOfDecreases = getNumOfDecreases(totalStitchCount);
	const numberOfDecreaseRounds = getNumOfDecreaseRounds(numOfDecreases);
	const decreaseRate = getDecreaseRate(numOfDecreases, numberOfDecreaseRounds);
	const thumbRows = calculateThumbRows(stitchesPerInch, measurements.thumbLength);

	const pattern = {
		description: "A basic mitten pattern written with a rib at the cuffs",
		instructions: {
			cuff: `CO ${totalStitchCount} stitches. Knit in a ${ribRepeat} rib for three inches.`,
			hand:`Knit in the round for ${wristToThumbRows} rounds. At beginning of round where thumb will be placed cut yarn, leaving a tail. Knit ${stitchesToSetAsideForThumb} stitches with waste yarn, then start knitting with main yarn again leaving  a tail. Knit for ${rowsToKnitBeforeDecreasing} rounds.`,
			top: `Decrease 4 times across mitten, evenly spaced. Repeat every ${decreaseRate} rounds ${numberOfDecreaseRounds} times. Knit one more decrease round spacing decreases evenly. Cut yarn leaving a long tail. Draw tail through stitches on needles twice, pull taut, and weave in ends.`,
			thumb: `Remove waste yarn from mitten hand. Pick up the stitches on either side of the thumb. Knit in the round for ${thumbRows} rounds. Decrease evenly 4 times and cut yarn leaving a long tail. Draw tail through thumb stitches and pull tight, then weave in end.`
		}
	}
	return pattern.instructions;
}

function getCastOn(handCircumference, stitchesPerInch, ribRepeat) {
	// Add positive ease so the mitten isn't tight
	let mittenCircumference = handCircumference + 1;
	let castOnCount = mittenCircumference * stitchesPerInch;
	const ribRepeatStitchCount = parseInt(ribRepeat.charAt(0)) * 2;
	const extraStitches = castOnCount % ribRepeatStitchCount;
	// Make sure the number of stitches is a multiple of 2x the ribbing so the ribbing ends correctly at the end of the round
	if (extraStitches !== 0) {
		castOnCount = castOnCount - extraStitches;
	}
	return castOnCount;
}

function getWristToThumbRows(measurements, rowsPerInch) {
	const rows = rowsPerInch * measurements.wristToThumb;
	return Math.round(rows);
}

function calculateThumbStitches(stitchesPerInch, thumbCircumference) {
	let thumbStitches = stitchesPerInch * thumbCircumference
	// Add a few stitches so that the thumb isnt tight
	thumbStitches = thumbStitches + (thumbStitches * 0.1)
	// Thumb stitches need to be divisible by 2
	if (thumbStitches % 2 === 1) {
		thumbStitches--;
	}
	return Math.round(thumbStitches);
}

function calculateThumbRows(rowsPerInch, thumbLength) {
	const thumbRows = Math.round(rowsPerInch * thumbLength);
	return thumbRows;
}

function calculateWhenToStartDecreases(rowsPerInch, handLength) {
	return Math.round(rowsPerInch * handLength * 0.8);
}

function getNumOfDecreases(stitchCount) {
	const endStitchCount = Math.round(stitchCount * 0.15);
	let numOfDecreases = stitchCount - endStitchCount;
	numOfDecreases = Math.round(numOfDecreases);
	return Math.round(numOfDecreases);
}

function getNumOfDecreaseRounds(numOfDecreases) {
	const numOfDecreaseRounds = numOfDecreases / 4;
	return Math.round(numOfDecreaseRounds);
}

function getDecreaseRate(numOfDecreases, numOfDecreaseRounds) {
	const rateOfDecreases = numOfDecreases / (numOfDecreaseRounds - 1)
	return Math.round(rateOfDecreases);
}

module.exports = {
	getMittenPattern: getMittenPattern,
	getCastOn: getCastOn,
	getWristToThumbRows: getWristToThumbRows,
	calculateThumbStitches: calculateThumbStitches,
	calculateThumbRows: calculateThumbRows,
	calculateWhenToStartDecreases: calculateWhenToStartDecreases,
	getNumOfDecreases: getNumOfDecreases,
	getNumOfDecreaseRounds: getNumOfDecreaseRounds,
	getDecreaseRate: getDecreaseRate
};