import api from "../api";
import { GetawayTour } from "@/models/experience";

const BASE_URL = "/classes/ProposedTour";

export type CreateGetawayTourDTO = Omit<GetawayTour, "objectId" | "createdAt" | "updatedAt">;
export type UpdateGetawayTourDTO = Partial<Omit<GetawayTour, "objectId" | "createdAt" | "updatedAt">>;

export const getGetawayTours = async (): Promise<GetawayTour[]> => {
  const response = await api.get<{ results: GetawayTour[] }>(BASE_URL, {
    where: JSON.stringify({ type: "getaway" }),
  });
  return response.results;
};

export const createGetawayTour = async (tour: CreateGetawayTourDTO): Promise<GetawayTour> => {
  return await api.post<GetawayTour>(BASE_URL, tour as Record<string, unknown>);
};

export const updateGetawayTour = async (id: string, tour: UpdateGetawayTourDTO): Promise<GetawayTour> => {
  return await api.put<GetawayTour>(`${BASE_URL}/${id}`, tour as Record<string, unknown>);
};

export const deleteGetawayTour = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
