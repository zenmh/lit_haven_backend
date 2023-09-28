import { Router } from "express";
import { AuthRoutes } from "./modules/auth/route";
import { UserRoutes } from "./modules/user/route";

const router = Router();

[
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
].forEach(({ path, route }) => router.use(path, route));

export default router;
