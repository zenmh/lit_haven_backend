import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { IRefreshTokenResponse, ISignInResponse } from "./interface";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { password, ...result } = await AuthService.signUp(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken, accessToken } = await AuthService.signIn(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
  });

  sendResponse<ISignInResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User signin successfully!",
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
  });

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully successfully!",
    data: result,
  });
});

export const AuthController = { signUp, signIn, refreshToken };
