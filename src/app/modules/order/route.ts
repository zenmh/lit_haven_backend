import { Router } from "express";
import { OrderController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrder } from "./validation";

const router = Router();
const { createOrder, getOrders, getOrdersForSpecificCustomer } =
  OrderController;

router
  .post("/create-order", validateRequest(ZCreateOrder), createOrder)
  //   .get("/", getOrders)
  .get("/", getOrdersForSpecificCustomer);

export const OrderRoutes = router;