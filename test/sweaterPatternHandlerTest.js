'use strict';

const mocha = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const assert = chai.assert;
const describe = mocha.describe;
const it = mocha.it;

const sweaterPatternHandler = require('../src/sweater/sweaterPatternHandler');

describe('#Sweater pattern handler', () => {
    describe('#pattern tests', () => {
        it('Handles request with whole numbers', () => {
            const request = {
                body: {
                    swatch: {
                        stitchesPerInch: 8,
                        rowsPerInch: 6
                    },
                    measurements: {
                        neck: 13,
                        torso: 40,
                        heightFromUnderarms: 12,
                        armLength: 22,
                        armCircumference: 13,
                        wrist: 6
                    },
                    ribRepeat: '1x1'
                }
            };

            const pattern = sweaterPatternHandler.getSweaterPattern(request);

            const expectedNeckString = 'CO 128 stitches. Knit in 1x1 rib for 2 inches.';
            assert.equal(pattern.neck, expectedNeckString);
            assert.isFalse(pattern.neck.includes('NaN'));
            assert.isFalse(pattern.neck.includes('undefined'));
            assert.isFalse(pattern.neck.includes('null'));

            const expectedPlaceMarkersString = 'Knit 25, place marker. Knit 14, place marker. Knit 50, place marker. Knit 14, place marker. Knit to BOR.';
            assert.equal(pattern.placeMarkers, expectedPlaceMarkersString);
            assert.isFalse(pattern.placeMarkers.includes('NaN'));
            assert.isFalse(pattern.placeMarkers.includes('undefined'));
            assert.isFalse(pattern.placeMarkers.includes('null'));

            const expectedNeckRaiseString = 'Knit 16 . Wrap and turn. Purl 32. Wrap and turn. Knit to wrapped stitch, pick up wrap and knit with stitch, knit 4, wrap and turn. Repeat rows this way 9 times. End on a knit row and knit back to BOR.';
            assert.equal(pattern.neckRaise, expectedNeckRaiseString);
            assert.isFalse(pattern.neckRaise.includes('NaN'));
            assert.isFalse(pattern.neckRaise.includes('undefined'));
            assert.isFalse(pattern.neckRaise.includes('null'));

            const expectedShouldersString = 'Knit to marker, m1r, slip marker, m1l. Repeat for other stitch markers. Next round: knit. Repeat these two rounds 72 times.';
            assert.equal(pattern.shoulders, expectedShouldersString);
            assert.isFalse(pattern.shoulders.includes('NaN'));
            assert.isFalse(pattern.shoulders.includes('undefined'));
            assert.isFalse(pattern.shoulders.includes('null'));

            const expectedBodyString = 'Knit to arm stitches, put arm stitches on waste yarn to hold for later. CO 74 at the underarm using a cable cast on. Knit across body stitches until the next arm is reached then repeat the process as for the other arm. Knit for 156 rows then knit in 1x1 rib for two inches and bind off.';
            assert.equal(pattern.body, expectedBodyString);
            assert.isFalse(pattern.body.includes('NaN'));
            assert.isFalse(pattern.body.includes('undefined'));
            assert.isFalse(pattern.body.includes('null'));

            const expectedSleevesString = 'Pick up stitches from waste yarn. Pick up and knit the 74 stitches from the underarm cast on. Knit for 60 rows then decrease 2 stitches every 0 rows 2 times. Knit 1x1 ribbing for 2" and bind off.';
            assert.equal(pattern.sleeves, expectedSleevesString);
            assert.isFalse(pattern.sleeves.includes('NaN'));
            assert.isFalse(pattern.sleeves.includes('undefined'));
            assert.isFalse(pattern.sleeves.includes('null'));
        });

        it('Handles request with fractional numbers', () => {
            const request = {
                body: {
                    swatch: {
                        stitchesPerInch: 8,
                        rowsPerInch: 6
                    },
                    measurements: {
                        neck: 13.534534,
                        torso: 40.345435,
                        heightFromUnderarms: 12.345354,
                        armLength: 22.345345,
                        armCircumference: 13.345345,
                        wrist: 6.5354345
                    },
                    ribRepeat: '1x1'
                }
            };

            const pattern = sweaterPatternHandler.getSweaterPattern(request);

            const expectedNeckString = 'CO 132 stitches. Knit in 1x1 rib for 2 inches.';
            assert.equal(pattern.neck, expectedNeckString);
            assert.isFalse(pattern.neck.includes('NaN'));
            assert.isFalse(pattern.neck.includes('undefined'));
            assert.isFalse(pattern.neck.includes('null'));

            const expectedPlaceMarkersString = 'Knit 25.5, place marker. Knit 15, place marker. Knit 51, place marker. Knit 15, place marker. Knit to BOR.';
            assert.equal(pattern.placeMarkers, expectedPlaceMarkersString);
            assert.isFalse(pattern.placeMarkers.includes('NaN'));
            assert.isFalse(pattern.placeMarkers.includes('undefined'));
            assert.isFalse(pattern.placeMarkers.includes('null'));

            const expectedNeckRaiseString = 'Knit 16 . Wrap and turn. Purl 32. Wrap and turn. Knit to wrapped stitch, pick up wrap and knit with stitch, knit 4, wrap and turn. Repeat rows this way 9 times. End on a knit row and knit back to BOR.';
            assert.equal(pattern.neckRaise, expectedNeckRaiseString);
            assert.isFalse(pattern.neckRaise.includes('NaN'));
            assert.isFalse(pattern.neckRaise.includes('undefined'));
            assert.isFalse(pattern.neckRaise.includes('null'));

            const expectedShouldersString = 'Knit to marker, m1r, slip marker, m1l. Repeat for other stitch markers. Next round: knit. Repeat these two rounds 74 times.';
            assert.equal(pattern.shoulders, expectedShouldersString);
            assert.isFalse(pattern.shoulders.includes('NaN'));
            assert.isFalse(pattern.shoulders.includes('undefined'));
            assert.isFalse(pattern.shoulders.includes('null'));

            const expectedBodyString = 'Knit to arm stitches, put arm stitches on waste yarn to hold for later. CO 73 at the underarm using a cable cast on. Knit across body stitches until the next arm is reached then repeat the process as for the other arm. Knit for 156 rows then knit in 1x1 rib for two inches and bind off.';
            assert.equal(pattern.body, expectedBodyString);
            assert.isFalse(pattern.body.includes('NaN'));
            assert.isFalse(pattern.body.includes('undefined'));
            assert.isFalse(pattern.body.includes('null'));

            const expectedSleevesString = 'Pick up stitches from waste yarn. Pick up and knit the 73 stitches from the underarm cast on. Knit for 61 rows then decrease 2 stitches every 0 rows 0 times. Knit 1x1 ribbing for 2" and bind off.';
            assert.equal(pattern.sleeves, expectedSleevesString);
            assert.isFalse(pattern.sleeves.includes('NaN'));
            assert.isFalse(pattern.sleeves.includes('undefined'));
            assert.isFalse(pattern.sleeves.includes('null'));
        });
    });

    describe('#Individual methods', () => {
        const measurements = {
            neck: 13.534534,
            torso: 40.345435,
            heightFromUnderarms: 12.345354,
            armLength: 22.345345,
            armCircumference: 13.345345,
            wrist: 6.5354345
        };

        it('#getNeckRaiseCounts returns all integers', () => {
            const stitchesPerInch = 5;
            const rowsPerInch = 6;
            const neckRaise = sweaterPatternHandler.getNeckRaiseCounts(stitchesPerInch, rowsPerInch);
            const expectedNeckRaise = {
                neckRaiseFirstKnitRowStitchCount: 10,
                neckRaiseFirstPurlRowStitchCount: 20,
                neckRaiseSubsequentStitchCount: 3,
                rowsToRepeat: 9
            };
            assert.deepEqual(neckRaise, expectedNeckRaise);
        });

        it('#getShoulderIncreaseCount returns an integer', () => {
            const rowsPerInch = 6;
            const shoulderIncreaseCount = sweaterPatternHandler.getShoulderIncreaseCount(measurements, rowsPerInch);
            assert.isTrue(Number.isInteger(shoulderIncreaseCount));
        });

        it('#divideForBodyAndSleeves returns integers', () => {
            const stitchesPerInch = 5;
            const ribRepeat = '2x2';
            const collarStitches = sweaterPatternHandler.divideForBodyAndSleeves(measurements, stitchesPerInch, ribRepeat);
            const expectedCollarStitches = {
                arm: 9,
                body: 33,
                totalCount: 84
            };
            assert.deepEqual(collarStitches, expectedCollarStitches);
        });

        it('#getSweaterTorsoRowCount returns an integer', () => {
            const rowsPerInch = 6;
            const sweaterTorsoRowCount = sweaterPatternHandler.getSweaterTorsoRowCount(measurements, rowsPerInch)
            assert.isTrue(Number.isInteger(sweaterTorsoRowCount));
        });

        it('#calculateNumberOfDecreasesSleeve returns an int', () => {
            const collarStitchesAtSleeve = 8;
            const stitchesPerInch = 6;
            const rowsPerInch = 6;
            const decreases = sweaterPatternHandler.calculateNumberOfDecreasesSleeve(collarStitchesAtSleeve, measurements, stitchesPerInch, rowsPerInch);
            assert.isTrue(Number.isInteger(decreases));
        });

        it('#getNoDecreaseSleeveLength returns an int', () => {
            const rowsPerInch = 6;
            const sleeveLength = sweaterPatternHandler.getNoDecreaseSleeveLength(measurements, rowsPerInch);
            assert.isTrue(Number.isInteger(sleeveLength));
        });

        it('#calculateUnderarmCastOn returns an int', () => {
            const bodyStitchStartingCount = 39;
            const stitchesPerInch = 5;
            const rowsPerInch = 6;
            const underArmStitches = sweaterPatternHandler.calculateUnderArmCastOn(bodyStitchStartingCount, stitchesPerInch, measurements, rowsPerInch);
            assert.isTrue(Number.isInteger(underArmStitches));
        });

        it('#calculateSleeveDecreaseRate returns an int', () => {
            const noDecreaseSleeveLength = 39;
            const numberOfDecreases = 5;
            const underArmStitches = sweaterPatternHandler.calculateSleeveDecreaseRate(noDecreaseSleeveLength, numberOfDecreases);
            assert.isTrue(Number.isInteger(underArmStitches));
        });

        it('#getTotalStitchCountForSingleSection returns an int', () => {
            const startingCollarStitches = 39;
            const rowsPerInch = 5;
            const underArmStitches = sweaterPatternHandler.getTotalStitchCountForSingleSection(startingCollarStitches, measurements, rowsPerInch);
            assert.isTrue(Number.isInteger(underArmStitches));
        });
    });
});