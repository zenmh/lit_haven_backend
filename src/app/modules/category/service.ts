import { Category } from "@prisma/client";
import prisma from "../../../constants/prisma";

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });

  return result;
};

export const CategoryService = { createCategory };
