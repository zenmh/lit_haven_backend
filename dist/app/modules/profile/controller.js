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
exports.ProfileController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield service_1.ProfileService.getProfile((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Profile retrived successfully",
        data: result,
    });
}));
exports.ProfileController = { getProfile };
