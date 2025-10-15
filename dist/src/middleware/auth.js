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
exports.isSuperAdmin = exports.isAdmin = exports.isLibrarian = exports.isStaff = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const services_1 = require("../services");
const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    let jwtsecret = env_1.config.Access_Token_Secret;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ status: 401, message: "No Token, Authorization denied" });
        }
        try {
            const decode = jsonwebtoken_1.default.verify(token, jwtsecret);
            req.user = decode;
            next();
        }
        catch (error) {
            res.status(400).json({ status: 400, message: "Token is not valid" });
        }
    }
    else {
        return res.status(401).json({ status: 401, message: "No Token, Authorization denied" });
    }
};
exports.verifyToken = verifyToken;
const isStaff = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const validUser = yield services_1.services.admin.findById(user.id);
    if (!validUser) {
        throw new Error("User not found");
    }
    return ((validUser.position.roleId >= 1 && validUser.position.roleId <= 4));
});
exports.isStaff = isStaff;
const isLibrarian = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const validUser = yield services_1.services.admin.findById(user.id);
    if (!validUser) {
        throw new Error("User not found");
    }
    return ((validUser.position.roleId >= 1 && validUser.position.roleId <= 3));
});
exports.isLibrarian = isLibrarian;
const isAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const validUser = yield services_1.services.admin.findById(user.id);
    if (!validUser) {
        throw new Error("User not found");
    }
    return ((validUser.position.roleId >= 1 && validUser.position.roleId <= 2));
});
exports.isAdmin = isAdmin;
const isSuperAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const validUser = yield services_1.services.admin.findById(user.id);
    if (!validUser) {
        throw new Error("User not found");
    }
    return (validUser.position.roleId === 1);
});
exports.isSuperAdmin = isSuperAdmin;
