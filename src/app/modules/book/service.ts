import { Book } from "@prisma/client";
import prisma from "../../../constants/prisma";

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({ data });

  return result;
};

export const BookService = { createBook };
