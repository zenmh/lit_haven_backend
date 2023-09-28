import { Router } from "express";
import { UserController } from "./controller";

const router = Router();
const { getUsers, getUser } = UserController;

router.get("/", getUsers).get("/:id", getUser);

export const UserRoutes = router;
