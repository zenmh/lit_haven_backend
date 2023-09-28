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

const getBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBook(req.params.id);

  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBook(req.params.id, req.body);

  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: "Book is deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getBooks,
  getBooksByCategoryId,
  getBook,
  deleteBook,
  updateBook,
};
