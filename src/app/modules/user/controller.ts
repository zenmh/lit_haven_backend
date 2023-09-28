import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./constant";
import { paginationFields } from "../../../constants/pagination";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);

  const { meta, data } = await UserService.getUsers(filters, options);

  sendResponse<User[]>(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully !",
    meta,
    data,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUser(req.params.id);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully !",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);

  sendResponse<User>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

export const UserController = { getUsers, getUser, updateUser };
