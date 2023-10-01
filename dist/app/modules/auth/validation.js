"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZRefreshToken = exports.ZSignin = exports.ZSignup = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ZSignup = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required !!" }),
        email: zod_1.z.string({ required_error: "Email is required !!" }).email(),
        password: zod_1.z.string({ required_error: "Password is required !!" }),
        role: zod_1.z
            .enum([...Object.keys(client_1.Role)], {
            required_error: "Role is required !!",
        })
            .default(client_1.Role.customer),
        contactNo: zod_1.z.string({ required_error: "Contact number is required !!" }),
        address: zod_1.z.string({ required_error: "Address is required !!" }),
        profileImg: zod_1.z.string({ required_error: "Profile image is required !!" }),
    }),
});
exports.ZSignup = ZSignup;
const ZSignin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required !!" }).email(),
        password: zod_1.z.string({ required_error: "Password is required !!" }),
    }),
});
exports.ZSignin = ZSignin;
const ZRefreshToken = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: "Refresh token is required !" }),
    }),
});
exports.ZRefreshToken = ZRefreshToken;
