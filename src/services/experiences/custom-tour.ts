import api from "@/services/api";
import { CreateCustomTourDTO } from "@/dtos/experiences/create-custom-tour-dto";
import { ProposedTour } from "@/models/proposed-tour";
import { UpdateExperienceDTO } from "@/dtos/experiences/update-experience-dto";

const BASE_URL = "/classes/ProposedTour";

export const createCustomTour = async (
  tour: CreateCustomTourDTO
): Promise<ProposedTour> => {
  return await api.post<ProposedTour>(BASE_URL, tour);
};

export const updateCustomTour = async (
  id: string,
  tour: UpdateExperienceDTO
): Promise<ProposedTour> => {
  return await api.put<ProposedTour>(`${BASE_URL}/${id}`, tour);
};
