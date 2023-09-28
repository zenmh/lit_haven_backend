import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateBook } from "./validation";
import { BookController } from "./controller";

const router = Router();
const { createBook, getBooks, getBooksByCategoryId } = BookController;

router
  .post("/create-book", validateRequest(ZCreateBook), createBook)
  .get("/", getBooks)
  .get("/:categoryId/category", getBooksByCategoryId);

export const BookRoutes = router;
