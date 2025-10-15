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
exports.BookService = void 0;
const model_1 = __importDefault(require("../database/model"));
const limit = 10;
class BookService {
    getAllBooks(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortedBy, order } = filters;
                const [books, totalRecords] = yield Promise.all([
                    model_1.default.book.findMany({
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortedBy]: order },
                        include: { bookIsbn: true },
                    }),
                    model_1.default.book.count()
                ]);
                if (!books) {
                    throw new Error("There are no books yet.");
                }
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: books, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to fetch books: " + err.message);
            }
        });
    }
    createBook(title, author, publish_year, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!title || !author || !publish_year || !isbn) {
                    throw new Error("Please fill in all fields.");
                }
                yield model_1.default.book.create({ data: { title: title, author: author, published_year: publish_year, bookIsbn: { create: { isbn: isbn } } } });
            }
            catch (err) {
                throw new Error("Failed to create books: " + err.message);
            }
        });
    }
    findBooks(query, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [books, totalRecords] = yield Promise.all([
                    model_1.default.book.findMany({
                        where: {
                            OR: [
                                { title: { contains: query, mode: "insensitive" } },
                                { author: { contains: query, mode: "insensitive" } },
                            ],
                        },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                        include: { bookIsbn: true },
                    }),
                    model_1.default.book.count({
                        where: {
                            OR: [
                                { title: { contains: query, mode: "insensitive" } },
                                { author: { contains: query, mode: "insensitive" } },
                            ],
                        },
                    })
                ]);
                if (!books) {
                    throw new Error("No books could be found.");
                }
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: books, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter books: " + err.message);
            }
        });
    }
    findBookTitle(title, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [books, totalRecords] = yield Promise.all([
                    model_1.default.book.findMany({
                        where: {
                            title: { contains: title, mode: "insensitive" }
                        },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                        include: { bookIsbn: true },
                    }),
                    model_1.default.book.count({
                        where: {
                            title: { contains: title, mode: "insensitive" }
                        },
                    })
                ]);
                if (!books) {
                    throw new Error("Books with that title could not be found.");
                }
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: books, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter book titles: " + err.message);
            }
        });
    }
    findBookAuthor(author, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, sortBy, order } = filters;
                const [Authors, totalRecords] = yield Promise.all([
                    model_1.default.book.findMany({
                        where: {
                            author: { contains: author, mode: "insensitive" }
                        },
                        skip: (page - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                        include: { bookIsbn: true },
                    }),
                    model_1.default.book.count({
                        where: {
                            author: { contains: author, mode: "insensitive" }
                        },
                    })
                ]);
                if (!Authors) {
                    throw new Error("Books from that author could not be found.");
                }
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: Authors, totalRecords, totalPages, page };
            }
            catch (err) {
                throw new Error("Failed to filter book authors: " + err.message);
            }
        });
    }
    findByYear(year, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, sortBy, order } = filters;
                const [Years, totalRecords] = yield Promise.all([
                    model_1.default.book.findMany({
                        where: { published_year: year },
                        skip: (currentPage - 1) * limit,
                        take: limit,
                        orderBy: { [sortBy]: order },
                        include: { bookIsbn: true },
                    }),
                    model_1.default.book.count({
                        where: { published_year: year },
                    })
                ]);
                if (!Years) {
                    throw new Error("Books by from that year could not be found.");
                }
                const totalPages = Math.ceil(totalRecords / limit);
                return { data: Years, totalRecords, totalPages, currentPage };
            }
            catch (err) {
                throw new Error("Failed to filter book years: " + err.message);
            }
        });
    }
    findByISBN(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ISBN = yield model_1.default.bookIsbn.findFirst({
                    where: { isbn: { contains: isbn, mode: "insensitive" } },
                    include: { book: true },
                });
                if (!ISBN) {
                    throw new Error("Book by that ISBN could not be found.");
                }
                return { data: ISBN };
            }
            catch (err) {
                throw new Error("Failed to find the book isbn: " + err.message);
            }
        });
    }
    findTotalBooks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isbn = yield model_1.default.bookIsbn.count({
                    where: { id: id },
                });
                if (!isbn) {
                    throw new Error("Book could not be found.");
                }
                return { data: isbn };
            }
            catch (err) {
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield model_1.default.book.findUnique({
                    where: { id: id },
                    include: { bookIsbn: true },
                });
                if (!book) {
                    throw new Error("Book by that ID could not be found.");
                }
                return { data: book };
            }
            catch (err) {
                throw new Error("Failed to find the book isbn: " + err.message);
            }
        });
    }
    BookDetails(isbnId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.bookIsbn.findUnique({
                    where: { id: isbnId },
                    include: { book: true },
                });
            }
            catch (error) {
                throw new Error("Something went wrong");
            }
        });
    }
    updateOneBook(id, title, author, published_year, isbnId, newIsbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !title || !author || !published_year || !isbnId || !newIsbn) {
                    throw new Error("Please fill in all fields.");
                }
                yield model_1.default.book.update({
                    where: { id: id },
                    data: {
                        title: title,
                        author: author,
                        published_year: published_year,
                        bookIsbn: {
                            update: {
                                where: { id: isbnId },
                                data: { isbn: newIsbn },
                            },
                        },
                    }
                });
            }
            catch (err) {
                throw new Error("Failed to update book: " + err.message);
            }
        });
    }
    deleteOneBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error("Please fill in an ID");
                }
                yield model_1.default.book.delete({
                    where: { id },
                });
            }
            catch (err) {
                throw new Error("Failed to delete book: " + err.message);
            }
        });
    }
    deleteManyBooks(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!ids) {
                    throw new Error("Please fill in the IDs");
                }
                yield model_1.default.book.deleteMany({
                    where: { id: { in: ids } },
                });
            }
            catch (err) {
                throw new Error("Failed to delete Many books: " + err.message);
            }
        });
    }
}
exports.BookService = BookService;
