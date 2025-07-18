import api from "../api";
import { ProposedTour } from "@/models/proposed-tour";
import { CreateCustomTourDTO } from "@/dtos/experiences/create-custom-tour.dto";

const BASE_URL = "/classes/ProposedTour";

export const createCustomTour = async (
  tour: CreateCustomTourDTO
): Promise<ProposedTour> => {
  const { ...payload } = tour;
  return await api.post<ProposedTour>(BASE_URL, payload);
};
