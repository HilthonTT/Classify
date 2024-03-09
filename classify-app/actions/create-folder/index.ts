"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { Folder } from "@/types/folder";
import { getInstance } from "@/lib/axios";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateFolder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  let folder: Folder;

  try {
    const axios = await getInstance();

    const values = { ...data, orgId };

    const response = await axios.post("/api/folders", values);

    folder = response.data as Folder;
  } catch (error) {
    return {
      error: "Failed to create folder",
    };
  }

  revalidatePath("/items");

  return { data: folder };
};

export const createFolder = createSafeAction(CreateFolder, handler);
