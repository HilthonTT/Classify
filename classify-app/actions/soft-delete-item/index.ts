"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { Item } from "@/types/item";
import { getInstance } from "@/lib/axios";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { SoftDeleteItem } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  let item: Item;

  try {
    const axios = await getInstance();

    const response = await axios.delete(`/api/items/soft/${data.id}`);

    item = response.data;
  } catch (error) {
    return {
      error: "Failed to delete the item",
    };
  }

  revalidatePath("/items");

  return { data: item };
};

export const softDeleteItem = createSafeAction(SoftDeleteItem, handler);
