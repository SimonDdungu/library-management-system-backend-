import { BookController } from "./bookController";
import { UserController } from "./userController";
import { AuthController } from "./authController";

export const controllers = {
    books: new BookController(),
    users: new UserController(),
    auth: new AuthController(),
}