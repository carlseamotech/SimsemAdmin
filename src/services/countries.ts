import { Country } from "@/models/country";
import api from "./api";
import logger from "@/lib/logger";

export const getCountries = async (): Promise<{ results: Country[] }> => {
  logger.debug("Attempting to get countries");
  try {
    const response = await api.get<{ results: Country[] }>("/classes/Country", {
      params: {
        limit: 200,
      },
    });
    logger.info("Successfully got countries", response);
    return response;
  } catch (error) {
    logger.error("Failed to get countries", error);
    throw error;
  }
};

