import { api } from "@/services/api";
import {
  CreateCustomTourDTO,
  UpdateCustomTourDTO,
} from "@/dtos/experiences";
import { ProposedTour } from "@/models/proposed-tour";

export const createCustomTour = async (
  data: CreateCustomTourDTO
): Promise<ProposedTour> => {
  const response = await api.post("/classes/ProposedTour", data);
  return response.data;
};

export const updateCustomTour = async (
  id: string,
  data: UpdateCustomTourDTO
): Promise<ProposedTour> => {
  const response = await api.put(`/classes/ProposedTour/${id}`, data);
  return response.data;
};