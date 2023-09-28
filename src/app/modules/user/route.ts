import { Router } from "express";
import { UserController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZUpdateUser } from "./validation";

const router = Router();
const { getUsers, getUser, updateUser, deleteUser } = UserController;

router
  .patch("/:id", validateRequest(ZUpdateUser), updateUser)
  .delete("/:id", deleteUser)
  .get("/", getUsers)
  .get("/:id", getUser);

export const UserRoutes = router;
