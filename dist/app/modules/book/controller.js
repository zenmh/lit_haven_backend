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
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const constant_1 = require("./constant");
const pagination_1 = require("../../../constants/pagination");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.BookService.createBook(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book crated successfully",
        data: result,
    });
}));
const getBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const filters = (0, pick_1.default)(req.query, constant_1.bookFilterableFields);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const minPrice = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.minPrice);
    const maxPrice = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.maxPrice);
    const { meta, data } = yield service_1.BookService.getBooks(filters, options, minPrice, maxPrice);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books retrived successfully",
        meta,
        data,
    });
}));
const getBooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const { meta, data } = yield service_1.BookService.getBooksByCategoryId(req.params.categoryId, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books with associated category data fetched successfully",
        meta,
        data,
    });
}));
const getBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.BookService.getBook(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book fetched successfully",
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.BookService.updateBook(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.BookService.deleteBook(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book is deleted successfully",
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getBooks,
    getBooksByCategoryId,
    getBook,
    deleteBook,
    updateBook,
};
