import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Order } from "@prisma/client";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = {
    userId: "f5233098-d9d4-4bc4-8574-001e46df6983",
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

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const { meta, data } = await OrderService.getOrders(options);

  sendResponse<Order[]>(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    meta,
    data,
  });
});

const getOrdersForSpecificCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);
    const userId = "f5233098-d9d4-4bc4-8574-001e46df6983";

    const { meta, data } = await OrderService.getOrdersForSpecificCustomer(
      userId,
      options
    );

    sendResponse<Order[]>(res, {
      statusCode: 200,
      success: true,
      message: "Orders retrieved successfully",
      meta,
      data,
    });
  }
);

export const OrderController = {
  createOrder,
  getOrders,
  getOrdersForSpecificCustomer,
};
