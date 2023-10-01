import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateOrUpdateCategory } from "./validation";
import { CategoryController } from "./controller";
import { Role } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = Router();
const { admin } = Role;
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = CategoryController;

router
  .post(
    "/create-category",
    auth(admin),
    validateRequest(ZCreateOrUpdateCategory),
    createCategory
  )
  .patch(
    "/:id",
    auth(admin),
    validateRequest(ZCreateOrUpdateCategory),
    updateCategory
  )
  .delete("/:id", auth(admin), deleteCategory)
  .get("/", getCategories)
  .get("/:id", getCategory);

export const CategoryRoutes = router;
