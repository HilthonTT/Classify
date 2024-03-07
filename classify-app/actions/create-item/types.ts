import { z } from "zod";

import { Item } from "@/types/item";
import { ActionState } from "@/lib/create-safe-action";

import { CreateItem } from "./schema";

export type InputType = z.infer<typeof CreateItem>;
export type ReturnType = ActionState<InputType, Item>;
