"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const controllers_1 = require("../controllers");
const generateAccessToken = (payload) => {
    const secret = env_1.config.Access_Token_Secret;
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "30s" });
    console.log(`New Access Token: ${token}`);
    return { Access_Token: token };
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const secret = env_1.config.Refresh_Token_Secret;
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "7d" });
    console.log(`New Refresh Token: ${token}`);
    return { Refresh_Token: token };
};
exports.generateRefreshToken = generateRefreshToken;
const newTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    const refreshSecret = env_1.config.Refresh_Token_Secret;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, refreshSecret);
        const user = yield controllers_1.controllers.auth.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const NewAccesstoken = (0, exports.generateAccessToken)(user);
        const NewRefreshtoken = (0, exports.generateRefreshToken)(user);
        return { NewAccesstoken, NewRefreshtoken };
    }
    catch (err) {
        return res.status(401).json({ message: "Refresh token invalid or expired" });
    }
});
exports.newTokens = newTokens;
