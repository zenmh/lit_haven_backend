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
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const constant_1 = require("./constant");
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.create({ data });
    return result;
});
const getCategories = (_a, options) => __awaiter(void 0, void 0, void 0, function* () {
    var { searchTerm } = _a, filtersData = __rest(_a, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: constant_1.categorySearchableFields.map((field) => ({
                [field]: { contains: searchTerm, mode: "insensitive" },
            })),
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
    const result = yield prisma_1.default.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
        include: { books: true },
    });
    const total = yield prisma_1.default.category.count({ where });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findFirst({
        where: { id },
        include: { books: true },
    });
    return result;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.update({ where: { id }, data: payload });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.delete({ where: { id } });
    return result;
});
exports.CategoryService = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
