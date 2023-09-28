import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Book } from "@prisma/client";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: "Book crated successfully",
    data: result,
  });
});

export const BookController = { createBook };
