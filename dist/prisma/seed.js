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
const model_1 = __importDefault(require("../src/database/model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const booksTemplate_1 = require("./booksTemplate");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield model_1.default.roles.createMany({
            data: [
                { name: 'SUPER_ADMIN' },
                { name: 'ADMIN' },
                { name: 'LIBRARIAN' },
                { name: 'STAFF' },
            ],
            skipDuplicates: true,
        });
        yield model_1.default.position.createMany({
            data: [
                { title: 'CEO', roleId: 1 },
                { title: 'IT Systems Officer', roleId: 1 },
                { title: 'Library Manager', roleId: 1 },
                { title: 'Chief Librarian', roleId: 2 },
                { title: 'Library Director', roleId: 2 },
                { title: 'Assistant Librarian', roleId: 3 },
                { title: 'Deputy Librarian', roleId: 3 },
                { title: 'Library Clerk', roleId: 4 },
                { title: 'Secretary', roleId: 4 },
            ],
            skipDuplicates: true,
        });
        const CEO = yield model_1.default.position.findUnique({ where: { title: 'CEO' } });
        const IT_Systems_Officer = yield model_1.default.position.findUnique({ where: { title: 'IT Systems Officer' } });
        const deputyLibrarian = yield model_1.default.position.findUnique({ where: { title: 'Deputy Librarian' } });
        const libraryClerk = yield model_1.default.position.findUnique({ where: { title: 'Library Clerk' } });
        const Secretary = yield model_1.default.position.findUnique({ where: { title: 'Secretary' } });
        if (!CEO || !IT_Systems_Officer || !deputyLibrarian || !libraryClerk || !Secretary) {
            throw new Error("Something went wrong seeding Positions");
        }
        const password = yield bcrypt_1.default.hash("password123", 10);
        yield model_1.default.admin.createMany({
            data: [
                // 1 Super Admin
                {
                    name: "Simon Ddungu",
                    email: "ceo@library.com",
                    phoneNumber: "1000000001",
                    password,
                    positionId: CEO.id,
                },
                // 2 Library Administrators
                {
                    name: "Riley Richy",
                    email: "systemsofficer@library.com",
                    phoneNumber: "1000000002",
                    password,
                    positionId: IT_Systems_Officer.id,
                },
                {
                    name: "Chief Librarian B",
                    email: "libadmin@library.com",
                    phoneNumber: "1000000003",
                    password,
                    positionId: IT_Systems_Officer.id,
                },
                // 2 Librarians
                {
                    name: "Deputy Librarian A",
                    email: "librarian1@library.com",
                    phoneNumber: "1000000004",
                    password,
                    positionId: deputyLibrarian.id,
                },
                {
                    name: "Deputy Librarian B",
                    email: "librarian2@library.com",
                    phoneNumber: "1000000005",
                    password,
                    positionId: deputyLibrarian.id,
                },
                // 5 Staff
                {
                    name: "Staff Member 1",
                    email: "staff1@library.com",
                    phoneNumber: "1000000006",
                    password,
                    positionId: Secretary.id,
                },
                {
                    name: "Staff Member 2",
                    email: "staff2@library.com",
                    phoneNumber: "1000000007",
                    password,
                    positionId: Secretary.id,
                },
                {
                    name: "Staff Member 3",
                    email: "staff3@library.com",
                    phoneNumber: "1000000008",
                    password,
                    positionId: Secretary.id,
                },
                {
                    name: "Staff Member 4",
                    email: "staff4@library.com",
                    phoneNumber: "1000000009",
                    password,
                    positionId: Secretary.id,
                },
                {
                    name: "Staff Member 5",
                    email: "staff5@library.com",
                    phoneNumber: "1000000010",
                    password,
                    positionId: Secretary.id,
                },
            ],
            skipDuplicates: true,
        });
        for (const book of booksTemplate_1.books) {
            yield model_1.default.book.create({ data: book });
        }
        console.log("Seeding completed successfully");
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield model_1.default.$disconnect();
    process.exit(1);
}));
