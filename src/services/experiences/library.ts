import { api } from "@/services/api";
import {
  CreateLibraryTourDTO,
  UpdateLibraryTourDTO,
  CreateLibraryMealDTO,
  UpdateLibraryMealDTO,
  CreateLibraryDishDTO,
  UpdateLibraryDishDTO,
} from "@/dtos/experiences";
import { LibraryTour, LibraryMeal, LibraryDish } from "@/models/library";

// Library Tours
export const getLibraryTours = async (
  limit: number,
  skip: number
): Promise<{ results: LibraryTour[]; count: number }> => {
  const response = await api.get("/classes/OfferedTour", {
    params: { limit, skip, count: 1 },
  });
  return response.data;
};

export const getLibraryTour = async (id: string): Promise<LibraryTour> => {
  const response = await api.get(`/classes/OfferedTour/${id}`);
  return response.data;
};

export const createLibraryTour = async (
  data: CreateLibraryTourDTO
): Promise<LibraryTour> => {
  const response = await api.post("/classes/OfferedTour", data);
  return response.data;
};

export const updateLibraryTour = async (
  id: string,
  data: UpdateLibraryTourDTO
): Promise<LibraryTour> => {
  const response = await api.put(`/classes/OfferedTour/${id}`, data);
  return response.data;
};

export const deleteLibraryTour = async (id: string): Promise<void> => {
  await api.delete(`/classes/OfferedTour/${id}`);
};

// Library Meals
export const getLibraryMeals = async (
  limit: number,
  skip: number
): Promise<{ results: LibraryMeal[]; count: number }> => {
  const response = await api.get("/classes/OfferedMeal", {
    params: { limit, skip, count: 1 },
  });
  return response.data;
};

export const getLibraryMeal = async (id: string): Promise<LibraryMeal> => {
  const response = await api.get(`/classes/OfferedMeal/${id}`);
  return response.data;
};

export const createLibraryMeal = async (
  data: CreateLibraryMealDTO
): Promise<LibraryMeal> => {
  const response = await api.post("/classes/OfferedMeal", data);
  return response.data;
};

export const updateLibraryMeal = async (
  id: string,
  data: UpdateLibraryMealDTO
): Promise<LibraryMeal> => {
  const response = await api.put(`/classes/OfferedMeal/${id}`, data);
  return response.data;
};

export const deleteLibraryMeal = async (id: string): Promise<void> => {
  await api.delete(`/classes/OfferedMeal/${id}`);
};

// Library Dishes
export const getLibraryDishes = async (
  limit: number,
  skip: number
): Promise<{ results: LibraryDish[]; count: number }> => {
  const response = await api.get("/classes/OfferedDish", {
    params: { limit, skip, count: 1 },
  });
  return response.data;
};

export const getLibraryDish = async (id: string): Promise<LibraryDish> => {
  const response = await api.get(`/classes/OfferedDish/${id}`);
  return response.data;
};

export const createLibraryDish = async (
  data: CreateLibraryDishDTO
): Promise<LibraryDish> => {
  const response = await api.post("/classes/OfferedDish", data);
  return response.data;
};

export const updateLibraryDish = async (
  id: string,
  data: UpdateLibraryDishDTO
): Promise<LibraryDish> => {
  const response = await api.put(`/classes/OfferedDish/${id}`, data);
  return response.data;
};

export const deleteLibraryDish = async (id: string): Promise<void> => {
  await api.delete(`/classes/OfferedDish/${id}`);
};