import { Router } from "express";
import { AuthController } from "./controller";
import validateRequest from "../../middlewares/validateRequest";
import { ZRefreshToken, ZSignin, ZSignup } from "./validation";

const router = Router();
const { signUp, signIn, refreshToken } = AuthController;

router
  .post("/signup", validateRequest(ZSignup), signUp)
  .post("/signin", validateRequest(ZSignin), signIn)
  .post("/refresh_token", validateRequest(ZRefreshToken), refreshToken);

export const AuthRoutes = router;
