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
exports.AuthController = void 0;
const services_1 = require("../services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../util/generateToken");
const Joi = require('joi');
const passwordSalt = process.env.PASSWORD_SALT;
class AuthController {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    name: Joi.string().required().min(3),
                    email: Joi.email().string().required().lowercase(),
                    phoneNumber: Joi.string().required().min(8),
                    password: Joi.string().required().min(8).pattern(/[a-z]/, "lowercase").pattern(/[A-Z]/, "UPPERCASE").pattern(/[0-9]/, "number"),
                    position: Joi.number().integer().required().max(1)
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { name, email, phoneNumber, password, position = 1 } = payload;
                    const email_exists = yield services_1.services.admin.findByEmail(email);
                    const phoneNumber_exists = yield services_1.services.admin.findByPhoneNumber(phoneNumber);
                    if (email_exists) {
                        return res.status(409).json({ message: "Admin with email already exists" });
                    }
                    else if (phoneNumber_exists) {
                        return res.status(409).json({ message: "Admin with phone number already exists" });
                    }
                    else {
                        const hashed_password = yield bcrypt_1.default.hash(password, passwordSalt);
                        const newAdmin = yield services_1.services.admin.createAdmin(name, email, phoneNumber, hashed_password, position);
                        return [(0, generateToken_1.generateAccessToken)(newAdmin), (0, generateToken_1.generateRefreshToken)(newAdmin)];
                    }
                }
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error.message });
            }
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    email: Joi.string().email().required().lowercase(),
                    password: Joi.string().min(8).pattern(/[a-z]/, "lowercase").pattern(/[A-Z]/, "UPPERCASE").pattern(/[0-9]/, "numbers"),
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { email, password } = payload;
                    const admin = yield services_1.services.admin.loginAdmin(email);
                    if (!admin) {
                        res.status(401).json({ message: "Incorrect Email" });
                    }
                    else {
                        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
                        if (!isPasswordValid) {
                            res.status(401).json({ message: "Incorrect Password" });
                        }
                    }
                    return admin;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { id } = payload;
                return yield services_1.services.admin.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    email: Joi.email().string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { email } = payload;
                return yield services_1.services.admin.findByEmail(email);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByPhoneNumber(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    phoneNumber: Joi.string().min(8).required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { phoneNumber } = payload;
                return yield services_1.services.admin.findByPhoneNumber(phoneNumber);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByPosition(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    position: Joi.number().max(1)
                });
                const payload = yield schema.validateAsync(req.query);
                const { position } = payload;
                return yield services_1.services.admin.findByPhoneNumber(position);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required(),
                    name: Joi.string().required().min(3),
                    email: Joi.email().string().required().lowercase(),
                    phoneNumber: Joi.string().required().min(8),
                    position: Joi.number().integer().required().max(1),
                    status: Joi.boolean()
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { id, name, email, phoneNumber, position = 1, status = true } = payload;
                    const email_exists = yield services_1.services.admin.findByEmail(email);
                    const phoneNumber_exists = yield services_1.services.admin.findByPhoneNumber(phoneNumber);
                    if (email_exists) {
                        return res.status(409).json({ message: "Admin with email already exists" });
                    }
                    else if (phoneNumber_exists) {
                        return res.status(409).json({ message: "Admin with phone number already exists" });
                    }
                    else {
                        return yield services_1.services.admin.updateAdmin(id, name, email, phoneNumber, position, status);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object({
                id: Joi.string().required(),
                password: Joi.string().required().min(8).pattern(/[a-z]/, "lowercase").pattern(/[A-Z]/, "UPPERCASE").pattern(/[0-9]/, "number"),
            });
            const payload = yield schema.validateAsync(req.body);
            if (payload.error == null) {
                const { id, password } = payload;
                const hashed_password = yield bcrypt_1.default.hash(password, passwordSalt);
                return yield services_1.services.admin.updateAdminPassword(id, hashed_password);
            }
        });
    }
    deleteAdmin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.admin.deleteOneAdmin(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteManyAdmins(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.array().items(Joi.string())
                });
                const payload = yield schema.validateAsync(req.body);
                const { id } = payload;
                return yield services_1.services.admin.deleteManyAdmins(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthController = AuthController;
