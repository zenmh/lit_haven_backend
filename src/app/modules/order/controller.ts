import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./service";
import sendResponse from "../../../shared/sendResponse";
import { Order } from "@prisma/client";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = {
    userId: req.user?.userId,
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

const getOrdersForAdmin = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const { meta, data } = await OrderService.getOrdersForAdmin(options);

  sendResponse<Order[]>(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully",
    meta,
    data,
  });
});

const getOrderForSpecificCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, paginationFields);

    const { meta, data } = await OrderService.getOrderForSpecificCustomer(
      req.user?.userId,
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

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrder(req.params.id);

  sendResponse<Order>(res, {
    statusCode: 200,
    success: true,
    message: "Order fatched successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrdersForAdmin,
  getOrderForSpecificCustomer,
  getOrder,
};
