import api from "../api";
import { ProposedTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";
import logger from "@/lib/logger";

export const createGetawayTour = async (
  data: ProposedTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  logger.debug("Attempting to create getaway tour", data);
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
    logger.info("Successfully created getaway tour", response);
    return response;
  } catch (error) {
    logger.error("Failed to create getaway tour", error);
    throw error;
  }
};

export const updateGetawayTour = async (
  id: string,
  data: Partial<ProposedTourDTO>,
  sessionToken?: string
): Promise<ProposedTour> => {
  logger.debug(`Attempting to update getaway tour with id: ${id}`, data);
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
    logger.info(`Successfully updated getaway tour with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update getaway tour with id: ${id}`, error);
    throw error;
  }
};