import { z } from "zod";

import { Item } from "@/types/item";
import { ActionState } from "@/lib/create-safe-action";

import { MoveFolder } from "./schema";

export type InputType = z.infer<typeof MoveFolder>;
export type ReturnType = ActionState<InputType, Item>;
