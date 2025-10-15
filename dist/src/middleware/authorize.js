"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = void 0;
const authorized = (policy, resource) => (req, res, next) => {
    const user = req.user;
    if (policy(user)) {
        return next();
    }
    else {
        return res.status(402).json({ status: 402, message: "Access Denied" });
    }
};
exports.authorized = authorized;
