'use strict';

const mocha = require('mocha');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai.assert;
const describe = mocha.describe;
const it = mocha.it;

const hatPatternHandler = require('../src/hat/hatPatternHandler');

describe('#hatPatternHandler', () => {
    describe('#pattern instructions', () => {
        it('handles a request with ints properly', () => {
            const request = {
                body: {
                    swatch: {
                        stitchesPerInch: 8,
                        rowsPerInch: 6
                    },
                    measurements: {
                        headCircumference: 22
                    },
                    ribRepeat: '2x2'
                }
            };

            const pattern = hatPatternHandler.getHatPattern(request);

            const expectedCuffString = 'CO 176 stitches. Knit in 2x2 rib for two inches.'
            assert.equal(pattern.cuff, expectedCuffString);
            assert.isFalse(pattern.cuff.includes('NaN'));
            assert.isFalse(pattern.cuff.includes('undefined'));
            assert.isFalse(pattern.cuff.includes('null'));

            const expectedHeadString = 'Knit in the round for 6 inches';
            assert.equal(pattern.head, expectedHeadString);
            assert.isFalse(pattern.head.includes('NaN'));
            assert.isFalse(pattern.head.includes('undefined'));
            assert.isFalse(pattern.head.includes('null'));

            const expectedCrownString = 'Round 1: knit 44 stitches, place marker. Repeat for remainder of round. Round 2: K2tog, knit to marker, slip marker. Round 3: Knit. Repeat rounds 2 and 3 until there are only 4 stitches remaining. Cut yarn, leaving a tail, and pull through remaining stitches on needles. Weave in ends.';
            assert.equal(pattern.crown, expectedCrownString);
            assert.isFalse(pattern.crown.includes('NaN'));
            assert.isFalse(pattern.crown.includes('undefined'));
            assert.isFalse(pattern.crown.includes('null'));
        });

        it('handles a request with fractional inputs properly', () => {
            const request = {
                body: {
                    swatch: {
                        stitchesPerInch: 8,
                        rowsPerInch: 6
                    },
                    measurements: {
                        headCircumference: 22.93847953875
                    },
                    ribRepeat: '2x2'
                }
            };

            const pattern = hatPatternHandler.getHatPattern(request);

            const expectedCuffString = 'CO 184 stitches. Knit in 2x2 rib for two inches.'
            assert.equal(pattern.cuff, expectedCuffString);
            assert.isFalse(pattern.cuff.includes('NaN'));
            assert.isFalse(pattern.cuff.includes('undefined'));
            assert.isFalse(pattern.cuff.includes('null'));

            const expectedHeadString = 'Knit in the round for 6 inches';
            assert.equal(pattern.head, expectedHeadString);
            assert.isFalse(pattern.head.includes('NaN'));
            assert.isFalse(pattern.head.includes('undefined'));
            assert.isFalse(pattern.head.includes('null'));

            const expectedCrownString = 'Round 1: knit 46 stitches, place marker. Repeat for remainder of round. Round 2: K2tog, knit to marker, slip marker. Round 3: Knit. Repeat rounds 2 and 3 until there are only 4 stitches remaining. Cut yarn, leaving a tail, and pull through remaining stitches on needles. Weave in ends.';
            assert.equal(pattern.crown, expectedCrownString);
            assert.isFalse(pattern.crown.includes('NaN'));
            assert.isFalse(pattern.crown.includes('undefined'));
            assert.isFalse(pattern.crown.includes('null'));
        });
    });

    describe('#individual methods', () => {
        it('#getCastOn returns an int that is divisible by 4', () => {
            const stitchesPerInch = 4.345;
            const handCircumference = 9.938745;
            const castOnCount = hatPatternHandler.getCastOn(stitchesPerInch, handCircumference);
            assert.isTrue(Number.isInteger(castOnCount));
            assert.equal(castOnCount % 4, 0);
        });

        it('getDecreaseSpacing throws an error if the result isnt an int', () => {
            try {
                hatPatternHandler.getDecreaseSpacing(43);
                // Fail the test if this didnt throw
                assert.fail();
            } catch (error) {
                assert.isOk(error);
            }
        });
    });
});