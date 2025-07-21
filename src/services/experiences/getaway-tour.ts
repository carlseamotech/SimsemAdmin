import api from "../api";
import { CreateGetawayTourDTO, UpdateGetawayTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";

export const createGetawayTour = async (
  data: CreateGetawayTourDTO
): Promise<ProposedTour> => {
  const response = await api.post("/classes/ProposedTour", data);
  return response.data;
};

export const updateGetawayTour = async (
  id: string,
  data: UpdateGetawayTourDTO
): Promise<ProposedTour> => {
  const response = await api.put(`/classes/ProposedTour/${id}`, data);
  return response.data;
};