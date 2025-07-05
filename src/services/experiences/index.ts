import api from "../api";
import { Experience } from "@/models/experience";

const BASE_URL = "/classes/ProposedTour";

export const getTours = async (
  limit: number,
  skip: number,
  params?: {
    where?: Record<string, unknown>;
    order?: string;
  }
): Promise<{ results: Experience[]; count: number }> => {
  return await api.get(BASE_URL, {
    params: {
      ...params,
      limit,
      skip,
      count: 1,
    },
  });
};
