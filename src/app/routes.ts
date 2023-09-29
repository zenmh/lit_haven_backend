import { Router } from "express";
import { AuthRoutes } from "./modules/auth/route";
import { UserRoutes } from "./modules/user/route";
import { CategoryRoutes } from "./modules/category/route";
import { BookRoutes } from "./modules/book/route";
import { OrderRoutes } from "./modules/order/route";
import { ProfileRoutes } from "./modules/profile/route";

const router = Router();

[
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/books", route: BookRoutes },
  { path: "/orders", route: OrderRoutes },
  { path: "/profile", route: ProfileRoutes },
].forEach(({ path, route }) => router.use(path, route));

export default router;
