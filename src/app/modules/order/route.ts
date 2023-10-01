import { Router } from "express";
import { OrderController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrder } from "./validation";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();
const { admin, customer } = Role;
const {
  createOrder,
  getOrdersForAdmin,
  getOrderForSpecificCustomer,
  getOrder,
} = OrderController;

router
  .post(
    "/create-order",
    auth(customer),
    validateRequest(ZCreateOrder),
    createOrder
  )
  .get("/", auth(admin), getOrdersForAdmin)
  .get("/my-orders", auth(customer), getOrderForSpecificCustomer)
  .get("/:id", auth(admin, customer), getOrder);

export const OrderRoutes = router;
