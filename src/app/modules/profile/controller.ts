import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ProfileService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfile(req.user?.userId);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrived successfully",
    data: result,
  });
});

export const ProfileController = { getProfile };
