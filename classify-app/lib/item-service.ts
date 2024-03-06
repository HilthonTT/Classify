import qs from "query-string";

import { getInstance } from "@/lib/axios";
import { Item } from "@/types/item";

export const getItems = async (search?: string): Promise<Item[]> => {
  const axios = await getInstance();

  const params = search ? { search } : {};

  const queryString = qs.stringify(params);

  const response = await axios.get(`/api/items?${queryString}`);
  const data = response.data as Item[];

  return data;
};
