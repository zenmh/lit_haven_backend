"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const { admin } = client_1.Role;
const { getUsers, getUser, updateUser, deleteUser } = controller_1.UserController;
router
    .patch("/:id", (0, auth_1.default)(admin), (0, validateRequest_1.default)(validation_1.ZUpdateUser), updateUser)
    .delete("/:id", (0, auth_1.default)(admin), deleteUser)
    .get("/", (0, auth_1.default)(admin), getUsers)
    .get("/:id", (0, auth_1.default)(admin), getUser);
exports.UserRoutes = router;
