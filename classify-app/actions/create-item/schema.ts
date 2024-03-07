import { z } from "zod";

export const CreateItem = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name is required",
  }),
  imageUrl: z.optional(z.string()),
  quantity: z.number(),
  minimumLevel: z.number(),
  price: z.number(),
});
