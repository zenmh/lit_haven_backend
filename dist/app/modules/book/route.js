"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const { admin } = client_1.Role;
const { createBook, getBooks, getBooksByCategoryId, getBook, updateBook, deleteBook, } = controller_1.BookController;
router
    .post("/create-book", (0, auth_1.default)(admin), (0, validateRequest_1.default)(validation_1.ZCreateBook), createBook)
    .patch("/:id", (0, auth_1.default)(admin), (0, validateRequest_1.default)(validation_1.ZUpdateBook), updateBook)
    .delete("/:id", (0, auth_1.default)(admin), deleteBook)
    .get("/", getBooks)
    .get("/:categoryId/category", getBooksByCategoryId)
    .get("/:id", getBook);
exports.BookRoutes = router;
