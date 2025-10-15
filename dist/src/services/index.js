"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const bookService_1 = require("./bookService");
const userService_1 = require("./userService");
const loanService_1 = require("./loanService");
const adminService_1 = require("./adminService");
exports.services = {
    books: new bookService_1.BookService(),
    users: new userService_1.UserService(),
    loans: new loanService_1.LoanService(),
    admin: new adminService_1.AdminService(),
};
