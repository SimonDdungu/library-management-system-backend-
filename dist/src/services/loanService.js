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
exports.LoanService = void 0;
const model_1 = __importDefault(require("../database/model"));
const limit = 20;
class LoanService {
    getAllLoans(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loans, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            user: {
                                is: { isActive: true }
                            }
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            user: {
                                is: { isActive: true }
                            }
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loans, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to fetch loans: " + err.message);
            }
        });
    }
    createLoan(userId, isbnId, bookDetails, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Does User exist?
                //Is book taken by another customer?
                //  book details
                return yield model_1.default.loan.create({
                    data: {
                        userId: userId,
                        isbnId: isbnId,
                        dueDate: dueDate,
                        bookTitle: bookDetails.book.title,
                        bookAuthor: bookDetails.book.author,
                        bookYear: bookDetails.book.published_year
                    }
                });
            }
            catch (err) {
                throw new Error("Failed to create loan: " + err.message);
            }
        });
    }
    findLoan(query, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loan, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            user: {
                                is: { isActive: true, name: { contains: query, mode: "insensitive" } },
                            },
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            user: {
                                is: { isActive: true, name: { contains: query, mode: "insensitive" } }
                            },
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loan, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter Loans: " + err.message);
            }
        });
    }
    getAllDeletedLoans(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loan, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            isActive: false,
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            isActive: false
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loan, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter Loans: " + err.message);
            }
        });
    }
    findDeletedLoan(query, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loan, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            isActive: false,
                            user: {
                                is: { isActive: true, name: { contains: query, mode: "insensitive" } },
                            },
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            isActive: false,
                            user: {
                                is: { isActive: true, name: { contains: query, mode: "insensitive" } }
                            },
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loan, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter Loans: " + err.message);
            }
        });
    }
    findLoanSuccess(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loan, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            user: {
                                is: { isActive: true }
                            },
                            statusId: 1,
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            user: {
                                is: { isActive: true }
                            },
                            statusId: 1
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loan, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter Loans: " + err.message);
            }
        });
    }
    findLoanPending(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loan, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            user: {
                                is: { isActive: true }
                            },
                            statusId: 2
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            user: {
                                is: { isActive: true }
                            },
                            statusId: 2
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loan, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter Loans: " + err.message);
            }
        });
    }
    findLoanFailed(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [loan, totalRecords] = yield Promise.all([
                    model_1.default.loan.findMany({
                        where: {
                            user: {
                                is: { isActive: true }
                            },
                            statusId: 3
                        },
                        include: { user: true, bookIsbn: { include: { book: true } } },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                    }),
                    model_1.default.loan.count({
                        where: {
                            user: {
                                is: { isActive: true }
                            },
                            statusId: 3
                        },
                    })
                ]);
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: loan, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter Loans: " + err.message);
            }
        });
    }
    isAvailable(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.bookIsbn.findFirst({
                    where: {
                        isbn: { contains: isbn, mode: "insensitive" },
                        loans: { none: { returnDate: null } },
                    },
                    include: { book: true }
                });
            }
            catch (error) {
                throw new Error("Something went wrong");
            }
        });
    }
    updateLoan(id, isbnId, returnDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.loan.update({
                    where: { id: id },
                    data: {
                        isbnId: isbnId,
                        returnDate: returnDate,
                    }
                });
            }
            catch (err) {
                throw new Error("Failed to update Loan: " + err.message);
            }
        });
    }
    deleteLoan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.loan.update({
                    where: { id },
                    data: { isActive: false }
                });
            }
            catch (err) {
                throw new Error("Failed to delete loan: " + err.message);
            }
        });
    }
    restoreLoan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.loan.update({
                    where: { id },
                    data: { isActive: true }
                });
            }
            catch (err) {
                throw new Error("Failed to restore loan: " + err.message);
            }
        });
    }
    permanentlyDeleteLoan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.default.loan.delete({
                    where: { id },
                });
            }
            catch (err) {
                throw new Error("Failed to delete loan: " + err.message);
            }
        });
    }
}
exports.LoanService = LoanService;
