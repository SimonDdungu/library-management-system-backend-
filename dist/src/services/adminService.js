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
exports.AdminService = void 0;
const model_1 = __importDefault(require("../database/model"));
const lodash_1 = __importDefault(require("lodash"));
class AdminService {
    createAdmin(name, email, phoneNumber, password, position) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.admin.create({ data: { name: lodash_1.default.startCase(lodash_1.default.toLower(name)), email: email.toLowerCase(), phoneNumber: phoneNumber, password: password, positionId: position } });
            }
            catch (err) {
                throw new Error("Failed to create Admin: " + err.message);
            }
        });
    }
    loginAdmin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.admin.findFirst({
                    where: {
                        email: email
                    }
                });
            }
            catch (err) {
                throw new Error("Failed to login admin: " + err.message);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.admin.findUnique({
                    where: {
                        id: id,
                    },
                    include: { position: true }
                });
            }
            catch (err) {
                throw new Error("Failed to filter by ID: " + err.message);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.admin.findFirst({
                    where: {
                        email: { equals: email, mode: "insensitive" },
                    },
                });
            }
            catch (err) {
                throw new Error("Failed to filter by Email: " + err.message);
            }
        });
    }
    findByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.admin.findFirst({
                    where: {
                        phoneNumber: { equals: phoneNumber, mode: "insensitive" },
                    },
                });
            }
            catch (err) {
                throw new Error("Failed to filter by Phone Number: " + err.message);
            }
        });
    }
    updateAdmin(id, name, email, phoneNumber, position, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.admin.update({
                    where: { id: id },
                    data: { name: name, email: email.toLowerCase(), phoneNumber: phoneNumber, positionId: position, isActive: status }
                });
            }
            catch (err) {
                throw new Error("Failed to update Admin: " + err.message);
            }
        });
    }
    updateAdminPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.admin.update({
                    where: { id: id },
                    data: { password: password }
                });
            }
            catch (err) {
                throw new Error("Failed to update Admin Password: " + err.message);
            }
        });
    }
    deleteOneAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.admin.update({
                    where: { id: id },
                    data: { isActive: false }
                });
            }
            catch (err) {
                throw new Error("Failed to delete Admin: " + err.message);
            }
        });
    }
    deleteManyAdmins(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.admin.updateMany({
                    where: { id: { in: ids } },
                    data: { isActive: false }
                });
            }
            catch (err) {
                throw new Error("Failed to delete Many Admins: " + err.message);
            }
        });
    }
}
exports.AdminService = AdminService;
