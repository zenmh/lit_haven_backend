import { z } from "zod";

const ZCreateOrder = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({ required_error: "Book id is required !!" }),
        quantity: z.number({ required_error: "Book quantity is required !!" }),
      }),
      { required_error: "Books are required !!" }
    ),
  }),
});

export { ZCreateOrder };
