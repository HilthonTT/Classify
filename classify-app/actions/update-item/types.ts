import { z } from "zod";

import { Item } from "@/types/item";
import { ActionState } from "@/lib/create-safe-action";

import { UpdateItem } from "./schema";

export type InputType = z.infer<typeof UpdateItem>;
export type ReturnType = ActionState<InputType, Item>;
