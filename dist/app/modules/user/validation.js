"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZUpdateUser = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ZUpdateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z
            .enum([...Object.keys(client_1.Role)])
            .default(client_1.Role.customer)
            .optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.ZUpdateUser = ZUpdateUser;
