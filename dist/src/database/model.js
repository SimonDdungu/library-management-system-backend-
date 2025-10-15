"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client"); // matches your output folder
const prisma = new client_1.PrismaClient();
exports.default = prisma;
