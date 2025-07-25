import api from "../api";
import {
  CreateDiningExperienceDTO,
  UpdateDiningExperienceDTO,
} from "@/dtos";
import { Meal } from "@/models/meal";
import logger from "@/lib/logger";

export interface GetMealsFilter {
  where?: {
    type?: { $in: string[] };
    objectId?: string;
    guideId?: string;
    country?: string;
  };
}

export const getMeals = async (
  limit: number,
  skip: number,
  filter: GetMealsFilter
): Promise<{ results: Meal[]; count: number }> => {
  logger.debug("Attempting to get meals", { limit, skip, filter });
  try {
    const response = await api.get<{ results: Meal[]; count: number }>(
      "/classes/SelectedMeal",
      {
        params: { limit, skip, where: filter, count: 1 },
      }
    );
    logger.info("Successfully got meals", response);
    return response;
  } catch (error) {
    logger.error("Failed to get meals", error);
    throw error;
  }
};

export const getMeal = async (id: string): Promise<Meal> => {
  logger.debug(`Attempting to get meal with id: ${id}`);
  try {
    const response = await api.get<Meal>(`/classes/SelectedMeal/${id}`);
    logger.info(`Successfully got meal with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get meal with id: ${id}`, error);
    throw error;
  }
};

export const createDiningExperience = async (
  data: CreateDiningExperienceDTO,
  sessionToken?: string
): Promise<Meal> => {
  logger.debug("Attempting to create dining experience", data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.post<Meal>("/classes/SelectedMeal", data, {
      headers,
    });
    logger.info("Successfully created dining experience", response);
    return response;
  } catch (error) {
    logger.error("Failed to create dining experience", error);
    throw error;
  }
};

export const updateMeal = async (
  id: string,
  data: UpdateDiningExperienceDTO,
  sessionToken?: string
): Promise<Meal> => {
  logger.debug(`Attempting to update meal with id: ${id}`, data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.put<Meal>(`/classes/SelectedMeal/${id}`, data, {
      headers,
    });
    logger.info(`Successfully updated meal with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update meal with id: ${id}`, error);
    throw error;
  }
};

export const deleteMeal = async (id: string): Promise<void> => {
  logger.debug(`Attempting to delete meal with id: ${id}`);
  try {
    await api.delete(`/classes/SelectedMeal/${id}`);
    logger.info(`Successfully deleted meal with id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete meal with id: ${id}`, error);
    throw error;
  }
};