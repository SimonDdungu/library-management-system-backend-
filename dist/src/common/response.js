"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = exports.sendSuccessMessage = void 0;
const sendSuccessMessage = (res, data) => {
    const response = {
        statusCode: 200,
        message: "Authorized, Successfully retrieved data.",
        data: data || {}
    };
    res.status(response.statusCode).send(response);
};
exports.sendSuccessMessage = sendSuccessMessage;
const handleErrorResponse = (res, status, error, message) => {
    let errorMessage = error.message;
    if (error.isJoi) {
        errorMessage = error.details[0].message;
    }
    const response = {
        statusCode: status || 500,
        message: message || "Internal Server Error",
        error: errorMessage,
    };
    res.status(response.statusCode).send(response);
};
exports.handleErrorResponse = handleErrorResponse;
