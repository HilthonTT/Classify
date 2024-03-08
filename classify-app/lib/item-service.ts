import qs from "query-string";

import { getInstance } from "@/lib/axios";
import { Item } from "@/types/item";
import { SortType } from "@/types/sort";

export const getItems = async (
  search?: string,
  sort?: SortType
): Promise<Item[]> => {
  const axios = await getInstance();

  const params = {
    search,
    sort,
  };

  const queryString = qs.stringify(params, {
    skipEmptyString: true,
    skipNull: true,
  });

  const response = await axios.get(`/api/items?${queryString}`);
  const data = response.data as Item[];

  return data;
};

export const getDeletedItems = async (): Promise<Item[]> => {
  const axios = await getInstance();

  const response = await axios.get("/api/items/deleted");
  const data = response.data as Item[];

  return data;
};
