import { Destination, DestinationDetails, TopCity, TopCityDetails } from "@/models/destination";
import api from "./api";
import logger from "@/lib/logger";

export const getDestinations = async (): Promise<{ results: Destination[] }> => {
  logger.debug("Attempting to get destinations");
  try {
    const response = await api.get<{ results: Destination[] }>("/classes/Destination");
    logger.info("Successfully got destinations", response);
    return response;
  } catch (error) {
    logger.error("Failed to get destinations", error);
    throw error;
  }
};

export const getDestinationDetails = async (destinationId: string): Promise<{ results: DestinationDetails[] }> => {
  logger.debug(`Attempting to get destination details for destinationId: ${destinationId}`);
  try {
    const response = await api.get<{ results: DestinationDetails[] }>("/classes/DestinationDetails", {
      params: { where: { destinationId } },
    });
    logger.info(`Successfully got destination details for destinationId: ${destinationId}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get destination details for destinationId: ${destinationId}`, error);
    throw error;
  }
};

export const getTopCities = async (destinationId: string): Promise<{ results: TopCity[] }> => {
  logger.debug(`Attempting to get top cities for destinationId: ${destinationId}`);
  try {
    const response = await api.get<{ results: TopCity[] }>("/classes/TopCity", {
      params: { where: { destinationId } },
    });
    logger.info(`Successfully got top cities for destinationId: ${destinationId}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get top cities for destinationId: ${destinationId}`, error);
    throw error;
  }
};

export const getTopCityDetails = async (cityId: string): Promise<{ results: TopCityDetails[] }> => {
  logger.debug(`Attempting to get top city details for cityId: ${cityId}`);
  try {
    const response = await api.get<{ results: TopCityDetails[] }>("/classes/TopCityDetails", {
      params: { where: { cityId } },
    });
    logger.info(`Successfully got top city details for cityId: ${cityId}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get top city details for cityId: ${cityId}`, error);
    throw error;
  }
};

