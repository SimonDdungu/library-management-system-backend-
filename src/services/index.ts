import { BookService } from "./bookService";
import { UserService } from "./userService";
import { LoanService } from "./loanService";

export const services = {
    books: new BookService(),
    users: new UserService(),
    loans: new LoanService(),
}