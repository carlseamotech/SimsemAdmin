import api from "./api";
import { Language } from "@/models/language";
import logger from "@/lib/logger";

export const getLanguages = async (): Promise<{ results: Language[] }> => {
  logger.debug("Attempting to get languages");
  try {
    const response = await api.get<{ results: Language[] }>("/classes/Language");
    logger.info("Successfully got languages", response);
    return response;
  } catch (error) {
    logger.error("Failed to get languages", error);
    throw error;
  }
};

