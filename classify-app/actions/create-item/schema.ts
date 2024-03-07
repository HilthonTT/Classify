import { z } from "zod";

export const CreateItem = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name is required",
  }),
  imageUrl: z.optional(z.string()),
  quantity: z.number().min(0, {
    message: "Quantity cannot be below 0",
  }),
  minimumLevel: z.number(),
  price: z.number(),
});
