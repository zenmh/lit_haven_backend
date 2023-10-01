import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateBook, ZUpdateBook } from "./validation";
import { BookController } from "./controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();
const { admin } = Role;
const {
  createBook,
  getBooks,
  getBooksByCategoryId,
  getBook,
  updateBook,
  deleteBook,
} = BookController;

router
  .post("/create-book", auth(admin), validateRequest(ZCreateBook), createBook)
  .patch("/:id", auth(admin), validateRequest(ZUpdateBook), updateBook)
  .delete("/:id", auth(admin), deleteBook)
  .get("/", getBooks)
  .get("/:categoryId/category", getBooksByCategoryId)
  .get("/:id", getBook);

export const BookRoutes = router;
