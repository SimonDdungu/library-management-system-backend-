import { BookController } from "./bookController";
import { UserController } from "./userController";

export const controllers = {
    books: new BookController(),
    users: new UserController(),
}