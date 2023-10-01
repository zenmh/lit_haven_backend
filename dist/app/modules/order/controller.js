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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = {
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        orderedBooks: req.body.orderedBooks,
    };
    const result = yield service_1.OrderService.createOrder(order);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order created successfully",
        data: result,
    });
}));
const getOrdersForAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const { meta, data } = yield service_1.OrderService.getOrdersForAdmin(options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrieved successfully",
        meta,
        data,
    });
}));
const getOrderForSpecificCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const { meta, data } = yield service_1.OrderService.getOrderForSpecificCustomer((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrieved successfully",
        meta,
        data,
    });
}));
const getOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.OrderService.getOrder(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order fatched successfully",
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getOrdersForAdmin,
    getOrderForSpecificCustomer,
    getOrder,
};
