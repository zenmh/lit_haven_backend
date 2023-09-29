import { Order } from "@prisma/client";
import prisma from "../../../constants/prisma";
import { IOrderDataRequest, IOrderedBook } from "./interface";
import ApiError from "../../../errors/ApiError";

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

export const OrderService = { createOrder };
