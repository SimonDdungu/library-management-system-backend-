"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
    else {
        // fallback
        console.error(err);
        res.status(500).json({ status: 500, message: "Internal Server Error", error: err });
    }
};
exports.default = errorHandler;
