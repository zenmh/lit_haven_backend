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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const constant_1 = require("./constant");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: { category: true },
    });
    return result;
});
const getBooks = (_a, options, minPrice, maxPrice) => __awaiter(void 0, void 0, void 0, function* () {
    var { searchTerm } = _a, filtersData = __rest(_a, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: constant_1.bookSearchableFields.map((field) => ({
                [field]: { contains: searchTerm, mode: "insensitive" },
            })),
        });
    }
    if (minPrice && !isNaN(minPrice)) {
        andConditions.push({
            price: { gte: minPrice },
        });
    }
    if (maxPrice && !isNaN(maxPrice)) {
        andConditions.push({
            price: { lte: maxPrice },
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key]: { equals: filtersData[key] },
            })),
        });
    }
    const where = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.book.count({ where });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getBooksByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelpers_1.calculatePagination)(options);
    const result = yield prisma_1.default.book.findMany({
        where: { categoryId },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.book.count({ where: { categoryId } });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findFirst({ where: { id } });
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({ where: { id }, data: payload });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({ where: { id } });
    return result;
});
exports.BookService = {
    createBook,
    getBooks,
    getBooksByCategoryId,
    getBook,
    updateBook,
    deleteBook,
};
