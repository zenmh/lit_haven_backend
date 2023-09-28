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

export { ZSignup };
