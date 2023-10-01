"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
const { admin } = client_1.Role;
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory, } = controller_1.CategoryController;
router
    .post("/create-category", (0, auth_1.default)(admin), (0, validateRequest_1.default)(validation_1.ZCreateOrUpdateCategory), createCategory)
    .patch("/:id", (0, auth_1.default)(admin), (0, validateRequest_1.default)(validation_1.ZCreateOrUpdateCategory), updateCategory)
    .delete("/:id", (0, auth_1.default)(admin), deleteCategory)
    .get("/", getCategories)
    .get("/:id", getCategory);
exports.CategoryRoutes = router;
