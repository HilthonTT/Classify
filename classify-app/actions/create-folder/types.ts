import { z } from "zod";

import { Folder } from "@/types/folder";
import { ActionState } from "@/lib/create-safe-action";

import { CreateFolder } from "./schema";

export type InputType = z.infer<typeof CreateFolder>;
export type ReturnType = ActionState<InputType, Folder>;
