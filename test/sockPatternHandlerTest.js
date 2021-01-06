'use strict';

const mocha = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai.assert;
const describe = mocha.describe;
const it = mocha.it;

const sockPatternHandler = require('../src/socks/sockPatternHandler');

describe('#sockPatternHandler', () => {
    describe('#sock pattern tests', () => {
        it('handles integer input', () => {
            const request = {
                body: {
                    swatch: {
                        stitchesPerInch: 8,
                        rowsPerInch: 6
                    },
                    measurements: {
                        footCircumference: 7,
                        footLength: 10
                    },
                    ribRepeat: '1x1'
                }

            };

            const pattern = sockPatternHandler.getSockPattern(request);

            const expectedCuffString = 'CO 56 stitches. Work in 1x1 ribbing until cuff measures one inch.';
            assert.equal(pattern.cuff, expectedCuffString);
            assert.isFalse(pattern.cuff.includes('NaN'));
            assert.isFalse(pattern.cuff.includes('undefined'));
            assert.isFalse(pattern.cuff.includes('null'));

            const expectedAnkleString = 'Knit in the round for 8 inches';
            assert.equal(pattern.ankle, expectedAnkleString);
            assert.isFalse(pattern.ankle.includes('NaN'));
            assert.isFalse(pattern.ankle.includes('undefined'));
            assert.isFalse(pattern.ankle.includes('null'));

            const expectedHeelString = 'Work across first 28 in heel stitch (knit 1 slip 1). Turn work. Repeat last row for 2 inches. Row 1: Knit 16 across heel, ssk, w&t. Row 2: Purl 6 stitches, k2tog, w&t. Row 3: Knit to wrapped stitch, pick up wrap and knit together with stitch, ssk, w&t. Row 4: Purl to wrapped stitch, pick up wrap and knit together with stitch, k2tog, w&t. Repeat rows 3 and 4 until you come to the end of the heel, ending on a knit row. Pick up and knit 1 stitch for every row along the heel gusset. Knit across cuff stitches, then pick up and knit across 1 stitch for every row along the heel gusset on the other side. Knit one round.';
            assert.equal(pattern.heel, expectedHeelString);
            assert.isFalse(pattern.heel.includes('NaN'));
            assert.isFalse(pattern.heel.includes('undefined'));
            assert.isFalse(pattern.heel.includes('null'));

            const expectedHeelDecreaseString = 'Knit in the round until you come to the heel gusset stitches, then K2tog. Knit until you come to the heel gusset stitches on the other side then ssl to decrease 2 stitches. Continue in this pattern decreasing every round until there are 56 on the needles.';
            assert.equal(pattern.heelDecreases, expectedHeelDecreaseString);
            assert.isFalse(pattern.heelDecreases.includes('NaN'));
            assert.isFalse(pattern.heelDecreases.includes('undefined'));
            assert.isFalse(pattern.heelDecreases.includes('null'));

            const expectedFootString = 'Knit in the round until the sock measures 8 inches.';
            assert.equal(pattern.foot, expectedFootString);
            assert.isFalse(pattern.foot.includes('NaN'));
            assert.isFalse(pattern.foot.includes('undefined'));
            assert.isFalse(pattern.foot.includes('null'));

            const expectedToeString = 'Row 1: K1, SSK, K 22, K2Tog, K1. Repeat once to BOR. Row 2: Knit. Repeat rows 1 and 2 until sock measures 1 inch less than the desired length. Then repeat row 1 until there are 9 stitches left on the needle. Graft the toe stitches together.';
            assert.equal(pattern.toe, expectedToeString);
            assert.isFalse(pattern.toe.includes('NaN'));
            assert.isFalse(pattern.toe.includes('undefined'));
            assert.isFalse(pattern.toe.includes('null'));
        });

        it('handles fractional input', () => {
            const request = {
                body: {
                    swatch: {
                        stitchesPerInch: 8,
                        rowsPerInch: 6
                    },
                    measurements: {
                        footCircumference: 7.8568768,
                        footLength: 10.76575
                    },
                    ribRepeat: '1x1'
                }

            };

            const pattern = sockPatternHandler.getSockPattern(request);

            const expectedCuffString = 'CO 64 stitches. Work in 1x1 ribbing until cuff measures one inch.';
            assert.equal(pattern.cuff, expectedCuffString);
            assert.isFalse(pattern.cuff.includes('NaN'));
            assert.isFalse(pattern.cuff.includes('undefined'));
            assert.isFalse(pattern.cuff.includes('null'));

            const expectedAnkleString = 'Knit in the round for 8 inches';
            assert.equal(pattern.ankle, expectedAnkleString);
            assert.isFalse(pattern.ankle.includes('NaN'));
            assert.isFalse(pattern.ankle.includes('undefined'));
            assert.isFalse(pattern.ankle.includes('null'));

            const expectedHeelString = 'Work across first 32 in heel stitch (knit 1 slip 1). Turn work. Repeat last row for 2 inches. Row 1: Knit 18 across heel, ssk, w&t. Row 2: Purl 6 stitches, k2tog, w&t. Row 3: Knit to wrapped stitch, pick up wrap and knit together with stitch, ssk, w&t. Row 4: Purl to wrapped stitch, pick up wrap and knit together with stitch, k2tog, w&t. Repeat rows 3 and 4 until you come to the end of the heel, ending on a knit row. Pick up and knit 1 stitch for every row along the heel gusset. Knit across cuff stitches, then pick up and knit across 1 stitch for every row along the heel gusset on the other side. Knit one round.';
            assert.equal(pattern.heel, expectedHeelString);
            assert.isFalse(pattern.heel.includes('NaN'));
            assert.isFalse(pattern.heel.includes('undefined'));
            assert.isFalse(pattern.heel.includes('null'));

            const expectedHeelDecreaseString = 'Knit in the round until you come to the heel gusset stitches, then K2tog. Knit until you come to the heel gusset stitches on the other side then ssl to decrease 2 stitches. Continue in this pattern decreasing every round until there are 64 on the needles.';
            assert.equal(pattern.heelDecreases, expectedHeelDecreaseString);
            assert.isFalse(pattern.heelDecreases.includes('NaN'));
            assert.isFalse(pattern.heelDecreases.includes('undefined'));
            assert.isFalse(pattern.heelDecreases.includes('null'));

            const expectedFootString = 'Knit in the round until the sock measures 8.8 inches.';
            assert.equal(pattern.foot, expectedFootString);
            assert.isFalse(pattern.foot.includes('NaN'));
            assert.isFalse(pattern.foot.includes('undefined'));
            assert.isFalse(pattern.foot.includes('null'));

            const expectedToeString = 'Row 1: K1, SSK, K 26, K2Tog, K1. Repeat once to BOR. Row 2: Knit. Repeat rows 1 and 2 until sock measures 1 inch less than the desired length. Then repeat row 1 until there are 9 stitches left on the needle. Graft the toe stitches together.';
            assert.equal(pattern.toe, expectedToeString);
            assert.isFalse(pattern.toe.includes('NaN'));
            assert.isFalse(pattern.toe.includes('undefined'));
            assert.isFalse(pattern.toe.includes('null'));
        });
    });

    describe('#individual methods', () => {
        it('getAnkleLength returns an integer', () => {
            const footLength = 8.394579;
            const ankleLength = sockPatternHandler.getAnkleLength(footLength);
            assert.isTrue(Number.isInteger(ankleLength));
        });

        it('getTotalSockStitchCount returns an integer', () => {
            const footCircumference = 8.394579;
            const stitchesPerInch = 6;
            const totalSockStitchCount = sockPatternHandler.getTotalSockStitchCount(stitchesPerInch, footCircumference);
            assert.isTrue(Number.isInteger(totalSockStitchCount));
        });

        it('getHeelShapingStitchCount returns an integer', () => {
            const totalSockStitches = 8.394579;
            const heelShapingStitchCount = sockPatternHandler.getHeelShapingStitchCount(totalSockStitches);
            assert.isTrue(Number.isInteger(heelShapingStitchCount));
        });

        it('getToeStitchCount throws an Internal Server Error if the resulting number of stitches contains a decimal', () => {
            try {
                const toeStitchCount = sockPatternHandler.getToeStitchCount(5);
                // If nothing threw fail the test
                assert.fail();
            } catch (error) {
                assert.isOk(error);
            }
        });

        it('getHeelStitchCount throws an Internal Server Error if the resulting number of stitches contains a decimal', () => {
            try {
                const toeStitchCount = sockPatternHandler.getHeelStitchCount(5);
                // If nothing threw fail the test
                assert.fail();
            } catch (error) {
                assert.isOk(error);
            }
        });

        it('getHeelShapingStitchCount should be more than 1/4 of the total stitch count', () => {
            const totalSockStitches = 43;
            const quarterSockStitches = totalSockStitches / 4;
            const heelShapingStitchCount = sockPatternHandler.getHeelShapingStitchCount(43);
            assert.isTrue(heelShapingStitchCount > quarterSockStitches);
        });
    });
});