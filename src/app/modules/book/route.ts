import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ZCreateBook } from "./validation";
import { BookController } from "./controller";

const router = Router();
const { createBook } = BookController;

router.post("/create-book", validateRequest(ZCreateBook), createBook);

export const BookRoutes = router;
