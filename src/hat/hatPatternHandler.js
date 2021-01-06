'use strict';

const InternalServerError = require('../error/InternalServerError');

function getHatPattern(request) {
	console.log('calculating hat pattern');

	const stitchesPerInch = request.body.swatch.stitchesPerInch;
	const headCircumference = request.body.measurements.headCircumference;
	const ribRepeat = request.body.ribRepeat;

	const castOnCount = getCastOn(stitchesPerInch, headCircumference);

	const decreaseSpacing = getDecreaseSpacing(castOnCount);

	const pattern = {
		description: "A basic hat pattern",
		instructions: {
			cuff: `CO ${castOnCount} stitches. Knit in ${ribRepeat} rib for two inches.`,
			head: `Knit in the round for 6 inches`,
			crown: `Round 1: knit ${decreaseSpacing} stitches, place marker. Repeat for remainder of round. Round 2: K2tog, knit to marker, slip marker. Round 3: Knit. Repeat rounds 2 and 3 until there are only 4 stitches remaining. Cut yarn, leaving a tail, and pull through remaining stitches on needles. Weave in ends.`
		}
	}

	return pattern.instructions;
}

function getCastOn(stitchesPerInch, headCircumference) {
	let castOnCount = Math.round(stitchesPerInch * headCircumference);
	// Make sure this is a multiple of 4 so the decreases work out OK
	const remainderStitches = castOnCount % 4;
	if(remainderStitches !== 0) {
		castOnCount = castOnCount + (4 - remainderStitches);
	}
	return castOnCount;
}

function getDecreaseSpacing(totalStitchCount) {
	const decreaseSpacing = totalStitchCount / 4;
	// Math was done earlier to make sure this was divisible by 4; if that failed throw an error
	if (!Number.isInteger(decreaseSpacing)) {
		throw new InternalServerError();
	}
	return decreaseSpacing;
}

module.exports = {
	getHatPattern: getHatPattern,
	getCastOn: getCastOn,
	getDecreaseSpacing: getDecreaseSpacing
};