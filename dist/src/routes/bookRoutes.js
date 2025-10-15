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
const express = require("express");
const controllers_1 = require("../controllers");
const response_1 = require("../common/response");
const router = express.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.getAllBooks(req);
        // authorized(isStaff)(req, res, () => {
        //     sendSuccessMessage(res, data)
        // });
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.findBooks(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.findBookTitle(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/year", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.findByYear(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/author", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.findBookAuthor(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/isbn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.findByISBN(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.findById(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.createBook(req, res);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.put("/update/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.updateOneBook(req, res);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.delete("/delete/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.deleteOneBook(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.post("/delete/book/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.books.deleteManyBooks(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
module.exports = router;
