import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Category } from "@prisma/client";
import pick from "../../../shared/pick";
import { categoryFilterableFields } from "./constant";
import { paginationFields } from "../../../constants/pagination";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, categoryFilterableFields);
  const options = pick(req.query, paginationFields);

  const { data, meta } = await CategoryService.getCategories(filter, options);

  sendResponse<Category[]>(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully",
    meta,
    data,
  });
});

export const CategoryController = { createCategory, getCategories };
