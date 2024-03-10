import { z } from "zod";

export const MoveFolder = z.object({
  itemId: z.number({
    required_error: "Item Id is required",
    invalid_type_error: "Item Id is required",
  }),
  folderId: z.number({
    required_error: "Folder Id is required",
    invalid_type_error: "Folder Id is required",
  }),
  notes: z.optional(
    z.string().max(4000, {
      message: "Notes are too long",
    })
  ),
});
