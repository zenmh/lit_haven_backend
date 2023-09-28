import { Router } from "express";
import { UserController } from "./controller";

const router = Router();
const { getUsers } = UserController;

router.get("/", getUsers);

export const UserRoutes = router;
