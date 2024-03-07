import { z } from "zod";

export const UpdateItem = z.object({
  id: z.number({
    required_error: "Item Id is required",
    invalid_type_error: "Item Id is required",
  }),
  folderId: z.optional(z.number()),
  name: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity is required",
    })
    .min(0, {
      message: "Quantity cannot be below 0",
    }),
  minimumLevel: z
    .number({
      required_error: "Minimum level is required",
      invalid_type_error: "Minimum level is required",
    })
    .min(0, {
      message: "Minimum level cannot be below 9",
    }),
  reason: z.optional(z.string()),
});
