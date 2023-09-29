import { Router } from "express";
import { OrderController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrder } from "./validation";

const router = Router();
const { createOrder, getOrders, getOrdersForSpecificCustomer, getOrder } =
  OrderController;

router
  .post("/create-order", validateRequest(ZCreateOrder), createOrder)
  .get("/", getOrders)
  .get("/", getOrdersForSpecificCustomer)
  .get("/:id", getOrder);

export const OrderRoutes = router;
