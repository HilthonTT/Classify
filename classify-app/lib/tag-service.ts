import { getInstance } from "@/lib/axios";
import { Tag } from "@/types/tag";

export const getTags = async (): Promise<Tag[]> => {
  const axios = await getInstance();

  const response = await axios.get("/api/tags");
  const data = response.data as Tag[];

  return data;
};
