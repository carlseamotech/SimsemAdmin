import api from "../api";
import { CreateOfferedTourDTO, UpdateOfferedTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";
import logger from "@/lib/logger";

export const createOfferedTour = async (
  data: CreateOfferedTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  logger.debug("Attempting to create offered tour", data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.post<ProposedTour>(
      "/classes/ProposedTour",
      data,
      { headers }
    );
    logger.info("Successfully created offered tour", response);
    return response;
  } catch (error) {
    logger.error("Failed to create offered tour", error);
    throw error;
  }
};

export const updateOfferedTour = async (
  id: string,
  data: UpdateOfferedTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  logger.debug(`Attempting to update offered tour with id: ${id}`, data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.put<ProposedTour>(
      `/classes/ProposedTour/${id}`,
      data,
      { headers }
    );
    logger.info(`Successfully updated offered tour with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update offered tour with id: ${id}`, error);
    throw error;
  }
};
