'use strict';

const DisallowedValueError = require('./error/DisallowedValuesError');

function validateUserInput(request) {
    const swatch = request.body.swatch;
    const measurements = request.body.measurements;
    const ribRepeat = request.body.ribRepeat;

    // TODO: swap this out for schema enum validation
    if(ribRepeat !== '1x1' && ribRepeat !== '2x2') {
        throw new DisallowedValueError(ribRepeat);
    }

    validateSwatch(swatch);
    validateMeasurements(measurements);
}

function validateSwatch(swatch) {
    // If the stitches per inch is a fraction or a negative number throw
    if(!Number.isInteger(swatch.rowsPerInch) || swatch.rowsPerInch < 1) {
        throw new DisallowedValueError(swatch.rowsPerInch);
    }

    // If the rows per inch is a fraction or a negative number throw
    if(!Number.isInteger(swatch.stitchesPerInch || swatch.stitchesPerInch < 1)) {
        throw new DisallowedValueError(swatch.stitchesPerInch);
    }
}

// Allow users to enter fractions but prevent them from entering negative numbers
function validateMeasurements(measurements) {
    for(const measurement in measurements) {
        if(measurements[measurement] < 1) {
            throw new DisallowedValueError(measurements[measurement]);
        }
    }
}

module.exports = {
    validateUserInput: validateUserInput
};
