import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./service";
import sendResponse from "../../../shared/sendResponse";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { password, ...result } = await AuthService.signUp(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

export const AuthController = { signUp };
