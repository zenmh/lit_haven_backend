import { Order } from "@prisma/client";
import prisma from "../../../constants/prisma";
import { IOrderDataRequest, IOrderedBook } from "./interface";
import ApiError from "../../../errors/ApiError";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { calculatePagination } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";

const createOrder = async (data: IOrderDataRequest): Promise<Order> => {
  const isUserExist = await prisma.user.findFirst({
    where: { id: data.userId },
  });

  if (!isUserExist) throw new ApiError(400, "User not found !");

  const result = await prisma.order.create({
    data: {
      userId: data.userId,
      orderedBooks: data.orderedBooks.map(({ bookId, quantity }) => ({
        bookId,
        quantity,
      })),
    },
  });

  return result;
};

const getOrdersForAdmin = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const result = await prisma.order.findMany({
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  const total = await prisma.order.count();

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getOrderForSpecificCustomer = async (
  userId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const isUserExist = await prisma.user.findFirst({ where: { id: userId } });

  if (!isUserExist) throw new ApiError(400, "User not found !");

  const result = await prisma.order.findMany({
    skip,
    take: limit,
    where: { userId },
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
  });

  const total = await prisma.order.count({ where: { userId } });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

const getOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findFirst({ where: { id } });

  return result;
};

export const OrderService = {
  createOrder,
  getOrdersForAdmin,
  getOrderForSpecificCustomer,
  getOrder,
};
