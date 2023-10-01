import { Router } from "express";
import { UserController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZUpdateUser } from "./validation";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();
const { admin } = Role;
const { getUsers, getUser, updateUser, deleteUser } = UserController;

router
  .patch("/:id", auth(admin), validateRequest(ZUpdateUser), updateUser)
  .delete("/:id", auth(admin), deleteUser)
  .get("/", auth(admin), getUsers)
  .get("/:id", auth(admin), getUser);

export const UserRoutes = router;
