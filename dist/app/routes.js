"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = require("./modules/auth/route");
const route_2 = require("./modules/user/route");
const route_3 = require("./modules/category/route");
const route_4 = require("./modules/book/route");
const route_5 = require("./modules/order/route");
const route_6 = require("./modules/profile/route");
const router = (0, express_1.Router)();
[
    { path: "/auth", route: route_1.AuthRoutes },
    { path: "/users", route: route_2.UserRoutes },
    { path: "/categories", route: route_3.CategoryRoutes },
    { path: "/books", route: route_4.BookRoutes },
    { path: "/orders", route: route_5.OrderRoutes },
    { path: "/profile", route: route_6.ProfileRoutes },
].forEach(({ path, route }) => router.use(path, route));
exports.default = router;
