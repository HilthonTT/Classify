import { getInstance } from "@/lib/axios";
import { Summary } from "@/types/summary";

export const getSummary = async (): Promise<Summary> => {
  const axios = await getInstance();

  const response = await axios.get("/api/summary");
  const data = response.data as Summary;

  return data;
};
