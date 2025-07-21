import api from "../api";
import { CreateCustomTourDTO, UpdateCustomTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";

export const createCustomTour = async (
  data: CreateCustomTourDTO
): Promise<ProposedTour> => {
  const response = await api.post<ProposedTour>("/classes/ProposedTour", data);
  return response;
};

export const updateCustomTour = async (
  id: string,
  data: UpdateCustomTourDTO
): Promise<ProposedTour> => {
  const response = await api.put<ProposedTour>(
    `/classes/ProposedTour/${id}`,
    data
  );
  return response;
};