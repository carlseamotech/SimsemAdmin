import { ProposedTour } from "@/models/proposed-tour";
import api from "../api";
import logger from "@/lib/logger";

export interface GetToursFilter {
  where?: {
    type?: { $in: string[] };
    objectId?: string;
    guideId?: string;
    country?: string;
  };
}

export const getTours = async (
  limit: number,
  skip: number,
  filter: GetToursFilter
): Promise<{ results: ProposedTour[]; count: number }> => {
  logger.debug("Attempting to get tours", { limit, skip, filter });
  try {
    const response = await api.get<{ results: ProposedTour[]; count: number }>(
      "/classes/ProposedTour",
      {
        params: { limit, skip, ...filter, count: 1 },
      }
    );
    logger.info("Successfully got tours", response);
    return response;
  } catch (error) {
    logger.error("Failed to get tours", error);
    throw error;
  }
};

export const getTour = async (id: string): Promise<ProposedTour> => {
  logger.debug(`Attempting to get tour with id: ${id}`);
  try {
    const response = await api.get<ProposedTour>(`/classes/ProposedTour/${id}`);
    logger.info(`Successfully got tour with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get tour with id: ${id}`, error);
    throw error;
  }
};

export const deleteTour = async (
  id: string,
  sessionToken?: string
): Promise<void> => {
  logger.debug(`Attempting to delete tour with id: ${id}`);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    await api.delete(`/classes/ProposedTour/${id}`, { headers });
    logger.info(`Successfully deleted tour with id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete tour with id: ${id}`, error);
    throw error;
  }
};
