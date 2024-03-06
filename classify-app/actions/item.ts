"use server";

import { getInstance } from "@/lib/axios";
import { Item } from "@/types/item";

export const createItem = async (values: Partial<Item>): Promise<Item> => {
  const axios = await getInstance();

  const response = await axios.post("api/items", values);
  const data = response.data as Item;

  return data;
};
