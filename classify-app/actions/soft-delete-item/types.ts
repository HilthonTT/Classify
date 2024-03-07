import { z } from "zod";

import { Item } from "@/types/item";
import { ActionState } from "@/lib/create-safe-action";

import { SoftDeleteItem } from "./schema";

export type InputType = z.infer<typeof SoftDeleteItem>;
export type ReturnType = ActionState<InputType, Item>;
