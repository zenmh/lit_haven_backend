"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errors = [{ path: "", message: error.message }];
    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
