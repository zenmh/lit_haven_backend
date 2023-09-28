import { Category, Prisma } from "@prisma/client";
import prisma from "../../../constants/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICategoryFilters } from "./interface";
import { calculatePagination } from "../../../helpers/paginationHelpers";
import { categorySearchableFields } from "./constant";

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });

  return result;
};

const getCategories = async (
  { searchTerm, ...filtersData }: ICategoryFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: { equals: (filtersData as any)[key] },
      })),
    });
  }

  const where: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  const total = await prisma.category.count({ where });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

export const CategoryService = { createCategory, getCategories };