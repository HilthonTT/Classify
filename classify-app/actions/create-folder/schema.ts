import { z } from "zod";

export const CreateFolder = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(1, {
      message: "Name is too short",
    })
    .max(60, {
      message: "Name is too long",
    }),
  notes: z.optional(z.string().max(4000)),
  tagId: z.optional(z.number()),
});
