import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrUpdateCategory } from "./validation";
import { CategoryController } from "./controller";

const router = Router();
const { createCategory } = CategoryController;

router.post(
  "/create-category",
  validateRequest(ZCreateOrUpdateCategory),
  createCategory
);

export const CategoryRoutes = router;
