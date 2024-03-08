"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { Item } from "@/types/item";
import { getInstance } from "@/lib/axios";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateItem } from "./schema";

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

    const response = await axios.patch(`/api/items`, data);

    item = response.data;
  } catch (error) {
    return {
      error: "Failed to update the item",
    };
  }

  revalidatePath("/items");
  revalidatePath(`/items/${data.id}`);
  revalidatePath("/trash");

  return { data: item };
};

export const updateItem = createSafeAction(UpdateItem, handler);
