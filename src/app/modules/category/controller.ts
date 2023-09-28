import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Category } from "@prisma/client";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const CategoryController = { createCategory };
