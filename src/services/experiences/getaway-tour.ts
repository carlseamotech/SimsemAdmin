import api from "../api";
import { ProposedTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";

export const createGetawayTour = async (
  data: ProposedTourDTO
): Promise<ProposedTour> => {
  const response = await api.post<ProposedTour>("/classes/ProposedTour", data);
  return response;
};

export const updateGetawayTour = async (
  id: string,
  data: Partial<ProposedTourDTO>
): Promise<ProposedTour> => {
  const response = await api.put<ProposedTour>(
    `/classes/ProposedTour/${id}`,
    data
  );
  return response;
};