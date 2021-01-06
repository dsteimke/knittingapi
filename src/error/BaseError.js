'use strict';

module.exports = class BaseError extends Error {
    constructor(message, statusCode, errorCode, messageCode, language, fields) {
        super(message);
        this.errorCode = errorCode;
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.messageCode = messageCode;
        this.language = language;
        this.fields = fields;
        Error.captureStackTrace(this, this.constructor);
    }

    getResponseBody() {
        return {
            errors: [
                {code: this.errorCode,
                message: this.message,
                fields: this.fields
                }
            ]
        }
    };
}