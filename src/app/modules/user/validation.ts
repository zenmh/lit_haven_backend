import { Role } from "@prisma/client";
import { z } from "zod";

const ZUpdateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z
      .enum([...Object.keys(Role)] as [string, ...string[]])
      .default(Role.CUSTOMER)
      .optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export { ZUpdateUser };
