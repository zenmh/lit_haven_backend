import { Router } from "express";
import { AuthController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZSignup } from "./validation";

const router = Router();
const { signUp } = AuthController;

router.post("/signup", validateRequest(ZSignup), signUp);

export const AuthRoutes = router;
