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
exports.BookController = void 0;
const services_1 = require("../services");
const lodash_1 = __importDefault(require("lodash"));
const Joi = require('joi');
class BookController {
    getAllBooks(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "createdAt", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.books.getAllBooks({ currentPage, sortedBy, order });
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    title: Joi.string().required(),
                    author: Joi.string().required(),
                    publish_year: Joi.number().integer().required().max(4),
                    isbn: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { title, author, publish_year, isbn } = payload;
                    const Title = lodash_1.default.startCase(title);
                    const Author = lodash_1.default.startCase(author);
                    const exists = yield services_1.services.books.findByISBN(isbn);
                    if (exists) {
                        return res.status(409).json({ message: "Book with ISBN already exists" });
                    }
                    else {
                        return yield services_1.services.books.createBook(Title, Author, publish_year, isbn);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    findBooks(req) {
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
                return yield services_1.services.books.findBooks(query, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findBookTitle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    title: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { title } = payload;
                //const {page = 1, sortedBy = "title", order = "asc"} = filters || {}
                const { page = "1", sortedBy = "title", order = "asc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.books.findBookTitle(title, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findBookAuthor(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    author: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { author } = payload;
                //const {page = 1, sortedBy = "author", order = "asc"} = filters || {}
                const { page = "1", sortedBy = "author", order = "asc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.books.findBookAuthor(author, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByYear(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    Year: Joi.number().integer().required().max(4)
                });
                const { year } = req.query;
                let SearchedYear = Number(year);
                const payload = yield schema.validateAsync(SearchedYear);
                const { Year } = payload;
                //const {page = 1, sortedBy = "year", order = "desc"} = filters || {}
                const { page = "1", sortedBy = "year", order = "desc" } = req.query;
                let currentPage = Number(page);
                return yield services_1.services.books.findByYear(Year, { currentPage, sortedBy, order });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByISBN(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    isbn: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.query);
                const { isbn } = payload;
                return yield services_1.services.books.findByISBN(isbn);
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
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.books.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateOneBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    author: Joi.string().required(),
                    publish_year: Joi.number().integer().required().max(4),
                    isbn_id: Joi.string().required(),
                    new_isbn: Joi.string().required(),
                });
                const payload = yield schema.validateAsync(req.body);
                if (payload.error == null) {
                    const { id, title, author, publish_year, isbn_id, new_isbn } = payload;
                    const Title = lodash_1.default.startCase(title);
                    const Author = lodash_1.default.startCase(author);
                    const exists = yield services_1.services.books.findByISBN(new_isbn);
                    if (exists) {
                        return res.status(409).json({ message: "Book with ISBN already exists" });
                    }
                    else {
                        return yield services_1.services.books.updateOneBook(id, Title, Author, publish_year, isbn_id, new_isbn);
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteOneBook(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                });
                const payload = yield schema.validateAsync(req.params);
                const { id } = payload;
                return yield services_1.services.books.deleteOneBook(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteManyBooks(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object({
                    id: Joi.array().items(Joi.string())
                });
                const payload = yield schema.validateAsync(req.body);
                const { id } = payload;
                return yield services_1.services.books.deleteManyBooks(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BookController = BookController;
