import { ParsedUrlQuery } from "querystring";
import api from "../api";
import {
  CreateLibraryDishDTO,
  CreateLibraryMealDTO,
  CreateLibraryTourDTO,
  UpdateLibraryDishDTO,
  UpdateLibraryMealDTO,
  UpdateLibraryTourDTO,
} from "@/dtos";
import { LibraryTour, LibraryMeal, LibraryDish } from "@/models/library";
import logger from "@/lib/logger";

// Library Tours
export const getLibraryTours = async (
  searchTerm?: string,
  country?: string,
  limit: number = 10,
  skip: number = 0
): Promise<{ results: LibraryTour[]; count: number }> => {
  logger.debug("Attempting to get library tours", { searchTerm, country, limit, skip });
  const params: ParsedUrlQuery = {
    order: "-createdAt",
    count: "1",
    limit: limit.toString(),
    skip: skip.toString(),
  };

  const where: { name?: { $regex: string; $options: string }; country?: string } = {};

  if (searchTerm) {
    where.name = {
      $regex: searchTerm,
      $options: "i",
    };
  }

  if (country) {
    where.country = country;
  }

  if (Object.keys(where).length > 0) {
    params.where = JSON.stringify(where);
  }

  try {
    const response = await api.get<{ results: LibraryTour[]; count: number }>(
      "/classes/OfferedTour",
      {
        params,
      }
    );
    logger.info("Successfully got library tours", response);
    return response;
  } catch (error) {
    logger.error("Failed to get library tours", error);
    throw error;
  }
};

export const getLibraryTour = async (id: string): Promise<LibraryTour> => {
  logger.debug(`Attempting to get library tour with id: ${id}`);
  try {
    const response = await api.get<LibraryTour>(`/classes/OfferedTour/${id}`);
    logger.info(`Successfully got library tour with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get library tour with id: ${id}`, error);
    throw error;
  }
};

export const createLibraryTour = async (
  data: CreateLibraryTourDTO,
  sessionToken?: string
): Promise<LibraryTour> => {
  logger.debug("Attempting to create library tour", data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.post<LibraryTour>("/classes/OfferedTour", data, {
      headers,
    });
    logger.info("Successfully created library tour", response);
    return response;
  } catch (error) {
    logger.error("Failed to create library tour", error);
    throw error;
  }
};

export const updateLibraryTour = async (
  id: string,
  data: UpdateLibraryTourDTO,
  sessionToken?: string
): Promise<LibraryTour> => {
  logger.debug(`Attempting to update library tour with id: ${id}`, data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    await api.put<LibraryTour>(
      `/classes/OfferedTour/${id}`,
      data,
      { headers }
    );
    const response = await getLibraryTour(id);
    logger.info(`Successfully updated library tour with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update library tour with id: ${id}`, error);
    throw error;
  }
};

export const deleteLibraryTour = async (id: string): Promise<void> => {
  logger.debug(`Attempting to delete library tour with id: ${id}`);
  try {
    await api.delete(`/classes/OfferedTour/${id}`);
    logger.info(`Successfully deleted library tour with id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete library tour with id: ${id}`, error);
    throw error;
  }
};

// Library Meals
export const getLibraryMeals = async (
  searchTerm?: string,
  country?: string,
  limit: number = 10,
  skip: number = 0
): Promise<{ results: LibraryMeal[]; count: number }> => {
  logger.debug("Attempting to get library meals", { searchTerm, country, limit, skip });
  const params: ParsedUrlQuery = {
    order: "-createdAt",
    count: "1",
    limit: limit.toString(),
    skip: skip.toString(),
  };

  const where: { name?: { $regex: string; $options: string }; country?: string } = {};

  if (searchTerm) {
    where.name = {
      $regex: searchTerm,
      $options: "i",
    };
  }

  if (country) {
    where.country = country;
  }

  if (Object.keys(where).length > 0) {
    params.where = JSON.stringify(where);
  }

  try {
    const response = await api.get<{ results: LibraryMeal[]; count: number }>(
      "/classes/OfferedMeal",
      {
        params,
      }
    );
    logger.info("Successfully got library meals", response);
    return response;
  } catch (error) {
    logger.error("Failed to get library meals", error);
    throw error;
  }
};

export const getLibraryMeal = async (id: string): Promise<LibraryMeal> => {
  logger.debug(`Attempting to get library meal with id: ${id}`);
  try {
    const response = await api.get<LibraryMeal>(`/classes/OfferedMeal/${id}`);
    logger.info(`Successfully got library meal with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get library meal with id: ${id}`, error);
    throw error;
  }
};

export const createLibraryMeal = async (
  data: CreateLibraryMealDTO,
  sessionToken?: string
): Promise<LibraryMeal> => {
  logger.debug("Attempting to create library meal", data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.post<LibraryMeal>("/classes/OfferedMeal", data, {
      headers,
    });
    logger.info("Successfully created library meal", response);
    return response;
  } catch (error) {
    logger.error("Failed to create library meal", error);
    throw error;
  }
};

export const updateLibraryMeal = async (
  id: string,
  data: UpdateLibraryMealDTO,
  sessionToken?: string
): Promise<LibraryMeal> => {
  logger.debug(`Attempting to update library meal with id: ${id}`, data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    await api.put<LibraryMeal>(
      `/classes/OfferedMeal/${id}`,
      data,
      { headers }
    );
    const response = await getLibraryMeal(id);
    logger.info(`Successfully updated library meal with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update library meal with id: ${id}`, error);
    throw error;
  }
};

export const deleteLibraryMeal = async (id: string): Promise<void> => {
  logger.debug(`Attempting to delete library meal with id: ${id}`);
  try {
    await api.delete(`/classes/OfferedMeal/${id}`);
    logger.info(`Successfully deleted library meal with id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete library meal with id: ${id}`, error);
    throw error;
  }
};

// Library Dishes
export const getLibraryDishes = async (
  searchTerm?: string,
  country?: string,
  limit: number = 10,
  skip: number = 0
): Promise<{ results: LibraryDish[]; count: number }> => {
  logger.debug("Attempting to get library dishes", { searchTerm, country, limit, skip });
  const params: ParsedUrlQuery = {
    order: "-createdAt",
    count: "1",
    limit: limit.toString(),
    skip: skip.toString(),
  };

  const where: { name?: { $regex: string; $options: string }; country?: string } = {};

  if (searchTerm) {
    where.name = {
      $regex: searchTerm,
      $options: "i",
    };
  }

  if (country) {
    where.country = country;
  }

  if (Object.keys(where).length > 0) {
    params.where = JSON.stringify(where);
  }

  try {
    const response = await api.get<{ results: LibraryDish[]; count: number }>(
      "/classes/OfferedDish",
      {
        params,
      }
    );
    logger.info("Successfully got library dishes", response);
    return response;
  } catch (error) {
    logger.error("Failed to get library dishes", error);
    throw error;
  }
};

export const getLibraryDish = async (id: string): Promise<LibraryDish> => {
  logger.debug(`Attempting to get library dish with id: ${id}`);
  try {
    const response = await api.get<LibraryDish>(`/classes/OfferedDish/${id}`);
    logger.info(`Successfully got library dish with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get library dish with id: ${id}`, error);
    throw error;
  }
};

export const createLibraryDish = async (
  data: CreateLibraryDishDTO,
  sessionToken?: string
): Promise<LibraryDish> => {
  logger.debug("Attempting to create library dish", data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    const response = await api.post<LibraryDish>("/classes/OfferedDish", data, {
      headers,
    });
    logger.info("Successfully created library dish", response);
    return response;
  } catch (error) {
    logger.error("Failed to create library dish", error);
    throw error;
  }
};

export const updateLibraryDish = async (
  id: string,
  data: UpdateLibraryDishDTO,
  sessionToken?: string
): Promise<LibraryDish> => {
  logger.debug(`Attempting to update library dish with id: ${id}`, data);
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }
  try {
    await api.put<LibraryDish>(
      `/classes/OfferedDish/${id}`,
      data,
      { headers }
    );
    const response = await getLibraryDish(id);
    logger.info(`Successfully updated library dish with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update library dish with id: ${id}`, error);
    throw error;
  }
};

export const deleteLibraryDish = async (id: string): Promise<void> => {
  logger.debug(`Attempting to delete library dish with id: ${id}`);
  try {
    await api.delete(`/classes/OfferedDish/${id}`);
    logger.info(`Successfully deleted library dish with id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete library dish with id: ${id}`, error);
    throw error;
  }
};
