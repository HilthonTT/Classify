import { getInstance } from "@/lib/axios";
import { Item } from "@/types/item";

export const getItems = async (): Promise<Item[]> => {
  const axios = await getInstance();

  const response = await axios.get("/api/items");
  const data = response.data as Item[];

  return data;
};
