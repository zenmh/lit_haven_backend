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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: { id: data.userId },
    });
    if (!isUserExist)
        throw new ApiError_1.default(400, "User not found !");
    const result = yield prisma_1.default.order.create({
        data: {
            userId: data.userId,
            orderedBooks: data.orderedBooks.map(({ bookId, quantity }) => ({
                bookId,
                quantity,
            })),
        },
    });
    return result;
});
const getOrdersForAdmin = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(options);
    const result = yield prisma_1.default.order.findMany({
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.order.count();
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getOrderForSpecificCustomer = (userId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(options);
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { id: userId } });
    if (!isUserExist)
        throw new ApiError_1.default(400, "User not found !");
    const result = yield prisma_1.default.order.findMany({
        skip,
        take: limit,
        where: { userId },
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.order.count({ where: { userId } });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findFirst({ where: { id } });
    return result;
});
exports.OrderService = {
    createOrder,
    getOrdersForAdmin,
    getOrderForSpecificCustomer,
    getOrder,
};
