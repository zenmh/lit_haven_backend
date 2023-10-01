"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const { admin, customer } = client_1.Role;
const { getProfile } = controller_1.ProfileController;
router.get("/", (0, auth_1.default)(admin, customer), getProfile);
exports.ProfileRoutes = router;
