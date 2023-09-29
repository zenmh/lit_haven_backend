import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Order } from "@prisma/client";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = {
    userId: "b6bc163d-a456-47dd-aae8-150a920062d5",
    orderedBooks: req.body.orderedBooks,
  };

  const result = await OrderService.createOrder(order);

  sendResponse<Order>(res, {
    statusCode: 200,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

export const OrderController = { createOrder };
