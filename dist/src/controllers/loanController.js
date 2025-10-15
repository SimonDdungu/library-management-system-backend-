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
exports.LoanController = void 0;
const services_1 = require("../services");
const Joi = require('joi');
class LoanController {
    getAllLoans(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.loans.getAllLoans({ currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    createLoan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    userId: Joi.string().required(),
                    isbn: Joi.string().required(),
                    dueDate: Joi.date().iso()
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { userId, isbn, dueDate } = payload;
                    const User_exists = yield services_1.services.users.exists(userId);
                    const is_BookAvailable = yield services_1.services.loans.isAvailable(isbn);
                    if (!User_exists) {
                        return res.status(404).json({ message: "User doesn't exist" });
                    }
                    else if (!is_BookAvailable) {
                        return res.status(404).json({ message: "Book not available" });
                    }
                    else {
                        const bookDetails = yield services_1.services.books.BookDetails(is_BookAvailable.id);
                        return yield services_1.services.loans.createLoan(userId, isbn, bookDetails, dueDate);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findLoan(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    query: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { query } = payload;
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.loans.findLoan(query, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findLoanSuccess(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.loans.findLoanSuccess({ currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findLoanPending(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.loans.findLoanPending({ currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findLoanFailed(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.loans.findLoanFailed({ currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findLoanDeleted(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    query: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { query } = payload;
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.loans.findDeletedLoan(query, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateLoan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required(),
                    isbn: Joi.string().required(),
                    returnDate: Joi.date().iso()
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { id, isbn, returnDate } = payload;
                    const is_BookAvailable = yield services_1.services.loans.isAvailable(isbn);
                    if (!is_BookAvailable) {
                        return res.status(404).json({ message: "Book not available" });
                    }
                    else {
                        const bookDetails = yield services_1.services.books.BookDetails(is_BookAvailable.id);
                        const isbnId = bookDetails === null || bookDetails === void 0 ? void 0 : bookDetails.id;
                        if (isbnId) {
                            return yield services_1.services.loans.updateLoan(id, isbnId, returnDate);
                        }
                        else {
                            res.status(500).json({ message: "Could not update Loan" });
                        }
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteOneLoan(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.loans.deleteLoan(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    permanentlyDeleteOneLoan(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.loans.permanentlyDeleteLoan(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.LoanController = LoanController;
