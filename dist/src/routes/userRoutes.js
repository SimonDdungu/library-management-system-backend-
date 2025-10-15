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
        const data = yield controllers_1.controllers.users.getAllUsers(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.findActiveUser(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/inactive", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.findInactiveUser(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/nin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.findByNIN(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.findByEmail(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.get("/search/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.findUser(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.createUser(req, res);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.put("/update/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.updateUser(req, res);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.put("/delete/many", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.deleteManyUsers(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.delete("/delete/permanently/many", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.permanentlyDeleteManyUsers(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.delete("/delete/permanently/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.permanentlyDeleteUser(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
router.put("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield controllers_1.controllers.users.deleteUser(req);
        (0, response_1.sendSuccessMessage)(res, data);
    }
    catch (error) {
        (0, response_1.handleErrorResponse)(res, 500, error);
    }
}));
module.exports = router;
