'use strict';

module.exports = class InternalServerError extends require('./BaseError') {
    constructor() {
        super('InternalServerError', 500, 'Internal Server Error', null, null, null);
        this.name = InternalServerError;
    }
}