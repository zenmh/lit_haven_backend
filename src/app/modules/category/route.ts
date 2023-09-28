import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrUpdateCategory } from "./validation";
import { CategoryController } from "./controller";

const router = Router();
const { createCategory, getCategories, getCategory, deleteCategory } =
  CategoryController;

router
  .post(
    "/create-category",
    validateRequest(ZCreateOrUpdateCategory),
    createCategory
  )
  .delete("/:id", deleteCategory)
  .get("/", getCategories)
  .get("/:id", getCategory);

export const CategoryRoutes = router;
