import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrUpdateCategory } from "./validation";
import { CategoryController } from "./controller";

const router = Router();
const { createCategory, getCategories } = CategoryController;

router
  .post(
    "/create-category",
    validateRequest(ZCreateOrUpdateCategory),
    createCategory
  )
  .get("/", getCategories);

export const CategoryRoutes = router;
