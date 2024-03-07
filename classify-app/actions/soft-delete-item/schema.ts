import { z } from "zod";

export const SoftDeleteItem = z.object({
  id: z.number({
    required_error: "Item Id is required",
    invalid_type_error: "Item Id is required",
  }),
});
