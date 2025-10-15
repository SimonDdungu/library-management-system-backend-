"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: Number(process.env.PORT) || 3008,
    db_url: process.env.DATABASE_URL,
    Access_Token_Secret: process.env.ACCESS_TOKEN_SECRET || "DefaultSecret",
    Refresh_Token_Secret: process.env.REFRESH_TOKEN_SECRET || "THATS_WHY_his_Thee_GOAT_7"
};
