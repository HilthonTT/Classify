import qs from "query-string";

import { getInstance } from "@/lib/axios";
import { Folder } from "@/types/folder";

export const getFolders = async (search?: string): Promise<Folder[]> => {
  const axios = await getInstance();

  const params = {
    search,
  };

  const queryString = qs.stringify(params, {
    skipEmptyString: true,
    skipNull: true,
  });

  const response = await axios.get(`/api/folders?${queryString}`);

  const data = response.data as Folder[];

  return data;
};

export const getDeletedFolders = async (): Promise<Folder[]> => {
  const axios = await getInstance();

  const response = await axios.get("/api/folders/deleted");
  const data = response.data as Folder[];

  return data;
};
