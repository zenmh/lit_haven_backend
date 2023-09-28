import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateBook, ZUpdateBook } from "./validation";
import { BookController } from "./controller";

const router = Router();
const { createBook, getBooks, getBooksByCategoryId, getBook, updateBook } =
  BookController;

router
  .post("/create-book", validateRequest(ZCreateBook), createBook)
  .patch("/:id", validateRequest(ZUpdateBook), updateBook)
  .get("/", getBooks)
  .get("/:categoryId/category", getBooksByCategoryId)
  .get("/:id", getBook);

export const BookRoutes = router;
