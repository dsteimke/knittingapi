'use strict';

module.exports = class DisallowedValuesError extends require('./BaseError') {
    constructor(fields) {
        super('Invalid field value', 400, 'InvalidValue', null, null, fields);
        this.name = DisallowedValuesError;
    }
}