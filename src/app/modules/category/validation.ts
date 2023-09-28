import { z } from "zod";

const ZCreateOrUpdateCategory = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required !!" }),
  }),
});

export { ZCreateOrUpdateCategory };
