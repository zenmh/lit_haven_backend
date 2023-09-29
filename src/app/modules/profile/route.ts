import { Router } from "express";
import { ProfileController } from "./controller";

const router = Router();
const { getProfile } = ProfileController;

router.get("/:id", getProfile); // id will remove from here

export const ProfileRoutes = router;
