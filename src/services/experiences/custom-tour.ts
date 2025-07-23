import api from "../api";
import { CreateCustomTourDTO, UpdateCustomTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";

export const createCustomTour = async (
  data: CreateCustomTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  const response = await api.post<ProposedTour>(
    "/classes/ProposedTour",
    data,
    { headers }
  );
  return response;
};

export const updateCustomTour = async (
  id: string,
  data: UpdateCustomTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  const response = await api.put<ProposedTour>(
    `/classes/ProposedTour/${id}`,
    data,
    { headers }
  );
  return response;
};
