import { Router } from "express";
import { ProfileController } from "./controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();
const { admin, customer } = Role;
const { getProfile } = ProfileController;

router.get("/", auth(admin, customer), getProfile);

export const ProfileRoutes = router;
