import api from "../api";
import { Experience } from "@/models/experience";

const BASE_URL = "/classes/ProposedTour";

export const getTours = async (params: {
  where?: Record<string, unknown>;
  limit?: number;
  order?: string;
}): Promise<Experience[]> => {
  const response = await api.get<{ results: Experience[] }>(BASE_URL, {
    params,
  });
  return response.results;
};
