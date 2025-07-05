import api from "../api";
import { ProposedTour } from "@/models/proposed-tour";
import {
  CreateProposedTourDTO,
  UpdateProposedTourDTO,
} from "@/dtos/experiences";

const BASE_URL = "/classes/ProposedTour";

export const getTours = async (
  limit: number,
  skip: number,
  params?: {
    where?: Record<string, unknown>;
    order?: string;
  }
): Promise<{ results: ProposedTour[]; count: number }> => {
  return await api.get(BASE_URL, {
    params: {
      ...params,
      limit,
      skip,
      count: 1,
    },
  });
};

export const getTour = async (id: string): Promise<ProposedTour> => {
  return await api.get(`${BASE_URL}/${id}`);
};

export const createTour = async (
  tour: CreateProposedTourDTO
): Promise<ProposedTour> => {
  return await api.post(BASE_URL, tour);
};

export const updateTour = async (
  id: string,
  tour: UpdateProposedTourDTO
): Promise<ProposedTour> => {
  return await api.put(`${BASE_URL}/${id}`, tour);
};

export const deleteTour = async (id: string): Promise<void> => {
  await api.put(`${BASE_URL}/${id}`, { isActive: false });
};
