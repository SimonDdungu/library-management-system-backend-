import { BookService } from "./bookService";
import { UserService } from "./userService";

export const services = {
    books: new BookService(),
    users: new UserService(),
}