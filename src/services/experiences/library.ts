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

// Library Tours
export const getLibraryTours = async (
  searchTerm?: string
): Promise<{ results: LibraryTour[]; count: number }> => {
  const params: ParsedUrlQuery = {
    order: "-createdAt",
    count: "1",
  };

  if (searchTerm) {
    params.where = JSON.stringify({
      name: {
        $regex: searchTerm,
        $options: "i",
      },
    });
  }

  const response = await api.get<{ results: LibraryTour[]; count: number }>(
    "/classes/OfferedTour",
    {
      params,
    }
  );
  return response;
};

export const getLibraryTour = async (id: string): Promise<LibraryTour> => {
  const response = await api.get<LibraryTour>(`/classes/OfferedTour/${id}`);
  return response;
};

export const createLibraryTour = async (
  data: CreateLibraryTourDTO
): Promise<LibraryTour> => {
  const response = await api.post<LibraryTour>("/classes/OfferedTour", data);
  return response;
};

export const updateLibraryTour = async (
  id: string,
  data: UpdateLibraryTourDTO
): Promise<LibraryTour> => {
  await api.put<LibraryTour>(
    `/classes/OfferedTour/${id}`,
    data
  );
  return getLibraryTour(id);
};

export const deleteLibraryTour = async (id: string): Promise<void> => {
  await api.delete(`/classes/OfferedTour/${id}`);
};

// Library Meals
export const getLibraryMeals = async (
  searchTerm?: string
): Promise<{ results: LibraryMeal[]; count: number }> => {
  const params: ParsedUrlQuery = {
    order: "-createdAt",
    count: "1",
  };

  if (searchTerm) {
    params.where = JSON.stringify({
      name: {
        $regex: searchTerm,
        $options: "i",
      },
    });
  }
  const response = await api.get<{ results: LibraryMeal[]; count: number }>(
    "/classes/OfferedMeal",
    {
      params,
    }
  );
  return response;
};

export const getLibraryMeal = async (id: string): Promise<LibraryMeal> => {
  const response = await api.get<LibraryMeal>(`/classes/OfferedMeal/${id}`);
  return response;
};

export const createLibraryMeal = async (
  data: CreateLibraryMealDTO
): Promise<LibraryMeal> => {
  const response = await api.post<LibraryMeal>("/classes/OfferedMeal", data);
  return response;
};

export const updateLibraryMeal = async (
  id: string,
  data: UpdateLibraryMealDTO
): Promise<LibraryMeal> => {
  await api.put<LibraryMeal>(
    `/classes/OfferedMeal/${id}`,
    data
  );
  return getLibraryMeal(id);
};

export const deleteLibraryMeal = async (id: string): Promise<void> => {
  await api.delete(`/classes/OfferedMeal/${id}`);
};

// Library Dishes
export const getLibraryDishes = async (
  searchTerm?: string
): Promise<{ results: LibraryDish[]; count: number }> => {
  const params: ParsedUrlQuery = {
    order: "-createdAt",
    count: "1",
  };

  if (searchTerm) {
    params.where = JSON.stringify({
      name: {
        $regex: searchTerm,
        $options: "i",
      },
    });
  }
  const response = await api.get<{ results: LibraryDish[]; count: number }>(
    "/classes/OfferedDish",
    {
      params,
    }
  );
  return response;
};

export const getLibraryDish = async (id: string): Promise<LibraryDish> => {
  const response = await api.get<LibraryDish>(`/classes/OfferedDish/${id}`);
  return response;
};

export const createLibraryDish = async (
  data: CreateLibraryDishDTO
): Promise<LibraryDish> => {
  const response = await api.post<LibraryDish>("/classes/OfferedDish", data);
  return response;
};

export const updateLibraryDish = async (
  id: string,
  data: UpdateLibraryDishDTO
): Promise<LibraryDish> => {
  await api.put<LibraryDish>(
    `/classes/OfferedDish/${id}`,
    data
  );
  return getLibraryDish(id);
};

export const deleteLibraryDish = async (id: string): Promise<void> => {
  await api.delete(`/classes/OfferedDish/${id}`);
};
