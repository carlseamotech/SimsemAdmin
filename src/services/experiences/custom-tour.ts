import api from "../api";
import { Experience } from "@/models/experience";

const BASE_URL = "/classes/ProposedTour";

export type CreateExperienceDTO = Omit<Experience, "objectId" | "createdAt" | "updatedAt">;
export type UpdateExperienceDTO = Partial<Omit<Experience, "objectId" | "createdAt" | "updatedAt">>;

export const getCustomTours = async (): Promise<Experience[]> => {
  const response = await api.get<{ results: Experience[] }>(BASE_URL, {
    where: JSON.stringify({ type: "custom" }),
  });
  return response.results;
};

export const createCustomTour = async (tour: CreateExperienceDTO): Promise<Experience> => {
  return await api.post<Experience>(BASE_URL, tour as Record<string, unknown>);
};

export const updateCustomTour = async (id: string, tour: UpdateExperienceDTO): Promise<Experience> => {
  return await api.put<Experience>(`${BASE_URL}/${id}`, tour as Record<string, unknown>);
};

export const deleteCustomTour = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
