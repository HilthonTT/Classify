"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { Item } from "@/types/item";
import { getInstance } from "@/lib/axios";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { MoveFolder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let item: Item;
  try {
    const axios = await getInstance();

    const response = await axios.patch("/api/items/moveFolder", data);

    item = response.data as Item;
  } catch (error) {
    return {
      error: "Failed to move folder",
    };
  }

  revalidatePath("/items");

  return { data: item };
};

export const moveFolder = createSafeAction(MoveFolder, handler);
