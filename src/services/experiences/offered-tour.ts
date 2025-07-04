import api from "../api";
import { OfferedTour } from "@/models/experience";

const BASE_URL = "/classes/ProposedTour";

export type CreateOfferedTourDTO = Omit<OfferedTour, "objectId" | "createdAt" | "updatedAt">;
export type UpdateOfferedTourDTO = Partial<Omit<OfferedTour, "objectId" | "createdAt" | "updatedAt">>;

export const getOfferedTours = async (): Promise<OfferedTour[]> => {
  const response = await api.get<{ results: OfferedTour[] }>(BASE_URL, {
    where: JSON.stringify({ type: "offered" }),
  });
  return response.results;
};

export const createOfferedTour = async (tour: CreateOfferedTourDTO): Promise<OfferedTour> => {
  return await api.post<OfferedTour>(BASE_URL, tour as Record<string, unknown>);
};

export const updateOfferedTour = async (id: string, tour: UpdateOfferedTourDTO): Promise<OfferedTour> => {
  return await api.put<OfferedTour>(`${BASE_URL}/${id}`, tour as Record<string, unknown>);
};

export const deleteOfferedTour = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
