import https from "https";
import axios from "axios";
import { auth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const getInstance = async () => {
  const { getToken } = auth();

  const token = await getToken({ template: "api" });
  if (!token) {
    throw new Error("Unauthorized");
  }

  const instance = axios.create({
    baseURL: API_URL,
    httpsAgent: agent,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};
