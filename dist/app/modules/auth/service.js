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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({ data });
    return result;
});
const signIn = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: { email, password },
    });
    if (!isUserExist)
        throw new ApiError_1.default(404, "User not found !");
    const { id: userId, role } = isUserExist;
    const accessToken = (0, jwtHelpers_1.createToken)({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpers_1.createToken)({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(403, "Invalid refresh token !");
    }
    const { userId: id } = verifiedToken;
    const isUserExist = yield prisma_1.default.user.findFirst({ where: { id } });
    if (!isUserExist)
        throw new ApiError_1.default(404, "User not found !");
    const newAccessToken = (0, jwtHelpers_1.createToken)({ userId: isUserExist.id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken: newAccessToken };
});
exports.AuthService = { signUp, signIn, refreshToken };
