'use strict';

const mocha = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai.assert;
const describe = mocha.describe;
const it = mocha.it;

const mittenPatternHandler = require('../src/mittens/mittenPatternHandler');

describe('#mittenPatternHandler', () => {
    it('handles request with whole numbers', () => {
        const request = {
            body: {
                swatch: {
                    stitchesPerInch: 8,
                    rowsPerInch: 6
                },
                measurements: {
                    handCircumference: 7,
                    handLength: 10,
                    wristToThumb: 3,
                    thumbCircumference: 2,
                    thumbLength: 2
                },
                ribRepeat: '1x1'
            }
        };

        const pattern = mittenPatternHandler.getMittenPattern(request);

        const expectedCuffString = 'CO 64 stitches. Knit in a 1x1 rib for three inches.';
        assert.equal(pattern.cuff, expectedCuffString);
        assert.isFalse(pattern.cuff.includes('NaN'));
        assert.isFalse(pattern.cuff.includes('undefined'));
        assert.isFalse(pattern.cuff.includes('null'));

        const expectedHandString = 'Knit in the round for 18 rounds. At beginning of round where thumb will be placed cut yarn, leaving a tail. Knit 9 stitches with waste yarn, then start knitting with main yarn again leaving  a tail. Knit for 48 rounds.';
        assert.equal(pattern.hand, expectedHandString);
        assert.isFalse(pattern.hand.includes('NaN'));
        assert.isFalse(pattern.hand.includes('undefined'));
        assert.isFalse(pattern.hand.includes('null'));

        const expectedTopString = 'Decrease 4 times across mitten, evenly spaced. Repeat every 4 rounds 14 times. Knit one more decrease round spacing decreases evenly. Cut yarn leaving a long tail. Draw tail through stitches on needles twice, pull taut, and weave in ends.';
        assert.equal(pattern.top, expectedTopString);
        assert.isFalse(pattern.top.includes('NaN'));
        assert.isFalse(pattern.top.includes('undefined'));
        assert.isFalse(pattern.top.includes('null'));

        const expectedThumbString = 'Remove waste yarn from mitten hand. Pick up the stitches on either side of the thumb. Knit in the round for 16 rounds. Decrease evenly 4 times and cut yarn leaving a long tail. Draw tail through thumb stitches and pull tight, then weave in end.';
        assert.equal(pattern.thumb, expectedThumbString);
        assert.isFalse(pattern.thumb.includes('NaN'));
        assert.isFalse(pattern.thumb.includes('undefined'));
        assert.isFalse(pattern.thumb.includes('null'));
    });

    it('handles request with fractional numbers', () => {
        const request = {
            body: {
                swatch: {
                    stitchesPerInch: 8,
                    rowsPerInch: 6
                },
                measurements: {
                    handCircumference: 7.767576,
                    handLength: 10.8987987,
                    wristToThumb: 2.565465465,
                    thumbCircumference: 2.8769878,
                    thumbLength: 2.645464
                },
                ribRepeat: '1x1'
            }
        };

        const pattern = mittenPatternHandler.getMittenPattern(request);

        const expectedCuffString = 'CO 70 stitches. Knit in a 1x1 rib for three inches.';
        assert.equal(pattern.cuff, expectedCuffString);
        assert.isFalse(pattern.cuff.includes('NaN'));
        assert.isFalse(pattern.cuff.includes('undefined'));
        assert.isFalse(pattern.cuff.includes('null'));

        const expectedHandString = 'Knit in the round for 15 rounds. At beginning of round where thumb will be placed cut yarn, leaving a tail. Knit 13 stitches with waste yarn, then start knitting with main yarn again leaving  a tail. Knit for 52 rounds.';
        assert.equal(pattern.hand, expectedHandString);
        assert.isFalse(pattern.hand.includes('NaN'));
        assert.isFalse(pattern.hand.includes('undefined'));
        assert.isFalse(pattern.hand.includes('null'));

        const expectedTopString = 'Decrease 4 times across mitten, evenly spaced. Repeat every 4 rounds 15 times. Knit one more decrease round spacing decreases evenly. Cut yarn leaving a long tail. Draw tail through stitches on needles twice, pull taut, and weave in ends.';
        assert.equal(pattern.top, expectedTopString);
        assert.isFalse(pattern.top.includes('NaN'));
        assert.isFalse(pattern.top.includes('undefined'));
        assert.isFalse(pattern.top.includes('null'));

        const expectedThumbString = 'Remove waste yarn from mitten hand. Pick up the stitches on either side of the thumb. Knit in the round for 21 rounds. Decrease evenly 4 times and cut yarn leaving a long tail. Draw tail through thumb stitches and pull tight, then weave in end.';
        assert.equal(pattern.thumb, expectedThumbString);
        assert.isFalse(pattern.thumb.includes('NaN'));
        assert.isFalse(pattern.thumb.includes('undefined'));
        assert.isFalse(pattern.thumb.includes('null'));
    });

    describe('#getCastOn', () => {
        it('returns an integer', () => {
            const handCircumference = 15.39485739457;
            const stitchesPerInch = 4;
            const ribRepeat = '2x2';
            const castOn = mittenPatternHandler.getCastOn(handCircumference, stitchesPerInch, ribRepeat);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#getWristToThumbRows', () => {
        it('returns an integer', () => {
            const measurements = {
                wristToThumb: 3.938475938573945739857
            };
            const rowsPerInch = 2;
            const castOn = mittenPatternHandler.getWristToThumbRows(measurements, rowsPerInch);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#calculateThumbStitches', () => {
        it('returns an integer', () => {
            const thumbCircumference = 4;
            const stitchesPerInch = 7.76575456534678656;
            const castOn = mittenPatternHandler.calculateThumbStitches(stitchesPerInch, thumbCircumference);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#calculateThumbRows', () => {
        it('returns an integer', () => {
            const thumbLength = 4.8765765757;
            const rowsPerInch = 7.76575456534678656;
            const castOn = mittenPatternHandler.calculateThumbRows(rowsPerInch, thumbLength);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#calculateWhenToStartDecreases', () => {
        it('returns an integer', () => {
            const handLength = 4.8765765757;
            const rowsPerInch = 7.76575456534678656;
            const castOn = mittenPatternHandler.calculateWhenToStartDecreases(rowsPerInch, handLength);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#getNumOfDecreases', () => {
        it('returns an integer', () => {
            const handLength = 4.8765765757;
            const stitchCount = 7.76575456534678656;
            const castOn = mittenPatternHandler.getNumOfDecreases(handLength, stitchCount);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#getNumOfDecreaseRounds', () => {
        it('returns an integer', () => {
            const numOfDecreases = 4.8765765757;
            const castOn = mittenPatternHandler.getNumOfDecreaseRounds(numOfDecreases);
            assert.isTrue(Number.isInteger(castOn));
        });
    });

    describe('#getDecreaseRate', () => {
        it('returns an integer', () => {
            const numOfDecreases = 4.8765765757;
            const numOfDereaseRounds = 3.39487593475
            const castOn = mittenPatternHandler.getDecreaseRate(numOfDecreases, numOfDereaseRounds);
            assert.isTrue(Number.isInteger(castOn));
        });
    });
});