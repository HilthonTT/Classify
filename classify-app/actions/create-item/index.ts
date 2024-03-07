"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { Item } from "@/types/item";
import { getInstance } from "@/lib/axios";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateItem } from "./schema";
import { InputType, ReturnType } from "./types";

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

    const response = await axios.post("api/items", data);

    item = response.data as Item;
  } catch (error) {
    return {
      error: "Failed to create item",
    };
  }

  revalidatePath("/items");

  return { data: item };
};

export const createItem = createSafeAction(CreateItem, handler);
