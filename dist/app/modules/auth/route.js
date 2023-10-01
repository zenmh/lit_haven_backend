"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
const { signUp, signIn, refreshToken } = controller_1.AuthController;
router
    .post("/signup", (0, validateRequest_1.default)(validation_1.ZSignup), signUp)
    .post("/signin", (0, validateRequest_1.default)(validation_1.ZSignin), signIn)
    .post("/refresh_token", (0, validateRequest_1.default)(validation_1.ZRefreshToken), refreshToken);
exports.AuthRoutes = router;
