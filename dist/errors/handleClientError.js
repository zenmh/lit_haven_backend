"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a;
    let errors = [];
    let message;
    if (error.code === "P2025") {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.message) || "Record not found !!";
        errors = [{ path: "", message }];
    }
    else if (error.code === "P2003" &&
        error.message.includes("delete()` invocation:")) {
        message = "Delere failed !!";
        errors = [{ path: "", message }];
    }
    return {
        statusCode: 400,
        message,
        errorMessages: errors,
    };
};
exports.default = handleClientError;
