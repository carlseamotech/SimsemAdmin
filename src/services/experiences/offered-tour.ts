import api from "../api";
import { CreateOfferedTourDTO, UpdateOfferedTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";

export const createOfferedTour = async (
  data: CreateOfferedTourDTO
): Promise<ProposedTour> => {
  const response = await api.post<ProposedTour>("/classes/ProposedTour", data);
  return response;
};

export const updateOfferedTour = async (
  id: string,
  data: UpdateOfferedTourDTO
): Promise<ProposedTour> => {
  const response = await api.put<ProposedTour>(
    `/classes/ProposedTour/${id}`,
    data
  );
  return response;
};
