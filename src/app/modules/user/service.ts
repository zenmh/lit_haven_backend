import { Prisma, User } from "@prisma/client";
import prisma from "../../../constants/prisma";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { calculatePagination } from "../../../helpers/paginationHelpers";
import { userSearchableFields } from "./constant";
import { IGenericResponse } from "../../../interfaces/common";
import { IUserFilters, IUserResponse } from "./interface";

const select = {
  id: true,
  name: true,
  email: true,
  role: true,
  contactNo: true,
  address: true,
  profileImg: true,
};

const getUsers = async (
  { searchTerm, ...filtersData }: IUserFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<IUserResponse[]>> => {
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
    select,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  const total = await prisma.user.count({ where });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getUser = async (id: string): Promise<IUserResponse | null> => {
  const result = await prisma.user.findFirst({
    where: { id },
    select,
  });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<IUserResponse> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
    select,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUserResponse> => {
  const result = await prisma.user.delete({
    where: { id },
    select,
  });

  return result;
};

export const UserService = { getUsers, getUser, updateUser, deleteUser };
