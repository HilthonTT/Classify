import qs from "query-string";

import { getInstance } from "@/lib/axios";
import { ActivityLog } from "@/types/activity";

export const getActivities = async (
  amount?: number
): Promise<ActivityLog[]> => {
  const axios = await getInstance();

  const queryString = qs.stringify(
    {
      amount,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );

  const response = await axios.get(`/api/activities?${queryString}`);
  const data = response.data as ActivityLog[];

  return data;
};
