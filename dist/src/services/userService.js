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
exports.UserService = void 0;
const model_1 = __importDefault(require("../database/model"));
const lodash_1 = __importDefault(require("lodash"));
const limit = 20;
class UserService {
    getAllUsers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [users, totalRecords] = yield Promise.all([
                    model_1.default.user.findMany({
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.user.count()
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: users, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to fetch users: " + err.message);
            }
        });
    }
    createUser(name, email, phoneNumber, NIN) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.user.create({ data: { name: lodash_1.default.startCase(lodash_1.default.toLower(name)), email: email.toLowerCase(), phoneNumber: phoneNumber, NIN: NIN } });
            }
            catch (err) {
                throw new Error("Failed to create user: " + err.message);
            }
        });
    }
    exists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.user.findUnique({ where: { id: userId } });
            }
            catch (error) {
                throw new Error("SOmething went wrong with user exists");
            }
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.user.findUnique({
                    where: {
                        id: id
                    },
                });
            }
            catch (err) {
                throw new Error("Failed to filter this user: " + err.message);
            }
        });
    }
    findActiveUser(name, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortedBy, order } = filters;
                const [users, totalRecords] = yield Promise.all([
                    model_1.default.user.findMany({
                        where: {
                            isActive: true,
                            name: { contains: name, mode: "insensitive" }
                        },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortedBy]: order },
                    }),
                    model_1.default.user.count({
                        where: {
                            isActive: true,
                            name: { contains: name, mode: "insensitive" }
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: users, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter active users: " + err.message);
            }
        });
    }
    findInActiveUser(name, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortedBy, order } = filters;
                const [users, totalRecords] = yield Promise.all([
                    model_1.default.user.findMany({
                        where: {
                            isActive: false,
                            name: { contains: name, mode: "insensitive" }
                        },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortedBy]: order },
                    }),
                    model_1.default.user.count({
                        where: {
                            isActive: false,
                            name: { contains: name, mode: "insensitive" }
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: users, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter inactive users: " + err.message);
            }
        });
    }
    findByNIN(NIN) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.user.findFirst({
                    where: {
                        NIN: { equals: NIN, mode: "insensitive" },
                    },
                });
            }
            catch (err) {
                throw new Error("Failed to filter by NIN: " + err.message);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.user.findFirst({
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
                return yield model_1.default.user.findFirst({
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
    updateUser(id, name, email, phoneNumber, NIN, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.user.update({
                    where: { id: id },
                    data: { name: name, email: email.toLowerCase(), phoneNumber: phoneNumber, NIN: NIN, isActive: status }
                });
            }
            catch (err) {
                throw new Error("Failed to update User: " + err.message);
            }
        });
    }
    deleteOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.user.update({
                    where: { id: id },
                    data: { isActive: false }
                });
            }
            catch (err) {
                throw new Error("Failed to delete User: " + err.message);
            }
        });
    }
    deleteManyUsers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.user.updateMany({
                    where: { id: { in: ids } },
                    data: { isActive: false }
                });
            }
            catch (err) {
                throw new Error("Failed to delete Many Users: " + err.message);
            }
        });
    }
    permanentlyDeleteOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.user.delete({
                    where: { id: id }
                });
            }
            catch (err) {
                throw new Error("Failed to permanently delete User: " + err.message);
            }
        });
    }
    permanentlydeleteManyUsers(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.user.deleteMany({
                    where: { id: { in: ids } }
                });
            }
            catch (err) {
                throw new Error("Failed to permanently delete Many Users: " + err.message);
            }
        });
    }
}
exports.UserService = UserService;
