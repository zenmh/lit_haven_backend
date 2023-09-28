import { Prisma, User } from "@prisma/client";
import prisma from "../../../constants/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { calculatePagination } from "../../../helpers/paginationHelpers";
import { userSearchableFields } from "./constant";
import { IGenericResponse } from "../../../interfaces/common";

const getUsers = async (
  { searchTerm, ...filtersData }: IUserFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
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

  const where: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  const total = await prisma.user.count({ where });

  return {
    meta: { total, page, limit },
    data: result,
  };
};

export const UserService = { getUsers };
