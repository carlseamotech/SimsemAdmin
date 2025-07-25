import api from "../api";
import { CreateCustomTourDTO, UpdateCustomTourDTO } from "@/dtos";
import { ProposedTour } from "@/models/proposed-tour";
import logger from "@/lib/logger";

export const createCustomTour = async (
  data: CreateCustomTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  logger.debug("Attempting to create custom tour", data);
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
    logger.info("Successfully created custom tour", response);
    return response;
  } catch (error) {
    logger.error("Failed to create custom tour", error);
    throw error;
  }
};

export const updateCustomTour = async (
  id: string,
  data: UpdateCustomTourDTO,
  sessionToken?: string
): Promise<ProposedTour> => {
  logger.debug(`Attempting to update custom tour with id: ${id}`, data);
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
    logger.info(`Successfully updated custom tour with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update custom tour with id: ${id}`, error);
    throw error;
  }
};
