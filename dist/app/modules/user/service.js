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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const constant_1 = require("./constant");
const select = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true,
};
const getUsers = (_a, options) => __awaiter(void 0, void 0, void 0, function* () {
    var { searchTerm } = _a, filtersData = __rest(_a, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePagination)(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: constant_1.userSearchableFields.map((field) => ({
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
    const result = yield prisma_1.default.user.findMany({
        where,
        skip,
        take: limit,
        select,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.user.count({ where });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: { id },
        select,
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: { id },
        data: payload,
        select,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: { id },
        select,
    });
    return result;
});
exports.UserService = { getUsers, getUser, updateUser, deleteUser };
