"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
};
