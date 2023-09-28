import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateBook } from "./validation";
import { BookController } from "./controller";

const router = Router();
const { createBook, getBooks } = BookController;

router
  .post("/create-book", validateRequest(ZCreateBook), createBook)
  .get("/", getBooks);

export const BookRoutes = router;
