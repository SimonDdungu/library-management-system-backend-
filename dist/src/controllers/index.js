"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const bookController_1 = require("./bookController");
const userController_1 = require("./userController");
const authController_1 = require("./authController");
exports.controllers = {
    books: new bookController_1.BookController(),
    users: new userController_1.UserController(),
    auth: new authController_1.AuthController(),
};
