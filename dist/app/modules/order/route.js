"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const { admin, customer } = client_1.Role;
const { createOrder, getOrdersForAdmin, getOrderForSpecificCustomer, getOrder, } = controller_1.OrderController;
router
    .post("/create-order", (0, auth_1.default)(customer), (0, validateRequest_1.default)(validation_1.ZCreateOrder), createOrder)
    .get("/", (0, auth_1.default)(admin), getOrdersForAdmin)
    .get("/my-orders", (0, auth_1.default)(customer), getOrderForSpecificCustomer)
    .get("/:id", (0, auth_1.default)(admin, customer), getOrder);
exports.OrderRoutes = router;
