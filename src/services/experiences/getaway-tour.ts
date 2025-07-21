import { api } from "@/services/api";
import { CreateGetawayTourDTO } from "@/dtos/experiences/create-getaway-tour.dto";
import { UpdateGetawayTourDTO } from "@/dtos/experiences/update-getaway-tour.dto";
import { ProposedTour } from "@/models/proposed-tour";

export const createGetawayTour = async (
  data: CreateGetawayTourDTO
): Promise<ProposedTour> => {
  const response = await api.post("/classes/ProposedTour", {
    ...data,
    type: "getaway",
  });
  return response.data;
};

export const updateGetawayTour = async (
  id: string,
  data: UpdateGetawayTourDTO
): Promise<ProposedTour> => {
  const response = await api.put(`/classes/ProposedTour/${id}`, data);
  return response.data;
};
