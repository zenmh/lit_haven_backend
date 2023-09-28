import { Role } from "@prisma/client";
import { z } from "zod";

const ZSignup = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required !!" }),
    email: z.string({ required_error: "Email is required !!" }).email(),
    password: z.string({ required_error: "Password is required !!" }),
    role: z
      .enum([...Object.keys(Role)] as [string, ...string[]], {
        required_error: "Role is required !!",
      })
      .default(Role.CUSTOMER),
    contactNo: z.string({ required_error: "Contact number is required !!" }),
    address: z.string({ required_error: "Address is required !!" }),
    profileImg: z.string({ required_error: "Profile image is required !!" }),
  }),
});

const ZSignin = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required !!" }).email(),
    password: z.string({ required_error: "Password is required !!" }),
  }),
});

const ZRefreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required !" }),
  }),
});

export { ZSignup, ZSignin, ZRefreshToken };
