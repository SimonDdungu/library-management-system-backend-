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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const services_1 = require("../services");
const Joi = require('joi');
class UserController {
    getAllUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.users.getAllUsers({ currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    name: Joi.string().required().min(3),
                    email: Joi.email().string().required().lowercase(),
                    phoneNumber: Joi.string().required().min(8),
                    NIN: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { name, email, phoneNumber, NIN } = payload;
                    const NIN_exists = yield services_1.services.users.findByNIN(NIN);
                    const email_exists = yield services_1.services.users.findByEmail(email);
                    const phoneNumber_exists = yield services_1.services.users.findByPhoneNumber(phoneNumber);
                    if (NIN_exists) {
                        return res.status(409).json({ message: "User with NIN already exists" });
                    }
                    else if (email_exists) {
                        return res.status(409).json({ message: "User with email already exists" });
                    }
                    else if (phoneNumber_exists) {
                        return res.status(409).json({ message: "User with phone number already exists" });
                    }
                    else {
                        return yield services_1.services.users.createUser(name, email, phoneNumber, NIN);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.users.findUser(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findActiveUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    name: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { name } = payload;
                //const {page = 1, sortedBy = "name", order = "asc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.users.findActiveUser(name, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findInactiveUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    name: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { name } = payload;
                //const {page = 1, sortedBy = "name", order = "asc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.users.findInActiveUser(name, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByNIN(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    NIN: Joi.number().string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { NIN } = payload;
                return yield services_1.services.users.findByNIN(NIN);
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
                return yield services_1.services.users.findByEmail(email);
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
                return yield services_1.services.users.findByPhoneNumber(phoneNumber);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    email: Joi.email().string().required(),
                    phoneNumber: Joi.string().required(),
                    NIN: Joi.string().required(),
                    status: Joi.boolean(),
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { id, name, email, phoneNumber, NIN, status = true } = payload;
                    const NIN_exists = yield services_1.services.users.findByNIN(NIN);
                    const email_exists = yield services_1.services.users.findByEmail(email);
                    const phoneNumber_exists = yield services_1.services.users.findByNIN(phoneNumber);
                    if (NIN_exists) {
                        return res.status(409).json({ message: "User with NIN already exists" });
                    }
                    else if (email_exists) {
                        return res.status(409).json({ message: "User with email already exists" });
                    }
                    else if (phoneNumber_exists) {
                        return res.status(409).json({ message: "User with phone number already exists" });
                    }
                    else {
                        return yield services_1.services.users.updateUser(id, name, email, phoneNumber, NIN, status);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.users.deleteOneUser(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteManyUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.array().items(Joi.string())
                });
                const payload = yield schema.validateAsync(req.body);
                const { id } = payload;
                return yield services_1.services.users.deleteManyUsers(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    permanentlyDeleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.users.permanentlyDeleteOneUser(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    permanentlyDeleteManyUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.array().items(Joi.string())
                });
                const payload = yield schema.validateAsync(req.body);
                const { id } = payload;
                return yield services_1.services.users.permanentlydeleteManyUsers(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserController = UserController;
