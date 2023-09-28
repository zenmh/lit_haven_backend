import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Book } from "@prisma/client";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./constant";
import { paginationFields } from "../../../constants/pagination";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: "Book crated successfully",
    data: result,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, paginationFields);

  const { meta, data } = await BookService.getBooks(filters, options);

  sendResponse<Book[]>(res, {
    statusCode: 200,
    success: true,
    message: "Books retrived successfully",
    meta,
    data,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const { meta, data } = await BookService.getBooksByCategoryId(
    req.params.categoryId,
    options
  );

  sendResponse<Book[]>(res, {
    statusCode: 200,
    success: true,
    message: "Books with associated category data fetched successfully",
    meta,
    data,
  });
});

export const BookController = { createBook, getBooks, getBooksByCategoryId };
