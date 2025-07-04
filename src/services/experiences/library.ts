import api from "../api";
import { LibraryTour, LibraryMeal, LibraryDish } from "@/models/experience";

const TOUR_BASE_URL = "/classes/OfferedTour";
const MEAL_BASE_URL = "/classes/OfferedMeal";
const DISH_BASE_URL = "/classes/OfferedDish";

// DTOs
export type CreateLibraryTourDTO = Omit<LibraryTour, "objectId" | "createdAt" | "updatedAt">;
export type UpdateLibraryTourDTO = Partial<Omit<LibraryTour, "objectId" | "createdAt" | "updatedAt">>;
export type CreateLibraryMealDTO = Omit<LibraryMeal, "objectId" | "createdAt" | "updatedAt">;
export type UpdateLibraryMealDTO = Partial<Omit<LibraryMeal, "objectId" | "createdAt" | "updatedAt">>;
export type CreateLibraryDishDTO = Omit<LibraryDish, "objectId" | "createdAt" | "updatedAt">;
export type UpdateLibraryDishDTO = Partial<Omit<LibraryDish, "objectId" | "createdAt" | "updatedAt">>;

// Library Tours
export const getLibraryTours = async (
  limit?: number
): Promise<LibraryTour[]> => {
  const params: Record<string, unknown> = {
    order: "-createdAt",
  };
  if (limit) {
    params.limit = limit;
  }
  const response = await api.get<{ results: LibraryTour[] }>(TOUR_BASE_URL, {
    params,
  });
  return response.results;
};

export const getLibraryTour = async (id: string): Promise<LibraryTour> => {
  return await api.get<LibraryTour>(`${TOUR_BASE_URL}/${id}`);
};

export const createLibraryTour = async (tour: CreateLibraryTourDTO): Promise<LibraryTour> => {
  return await api.post<LibraryTour>(TOUR_BASE_URL, tour as Record<string, unknown>);
};

export const updateLibraryTour = async (id: string, tour: UpdateLibraryTourDTO): Promise<LibraryTour> => {
  return await api.put<LibraryTour>(`${TOUR_BASE_URL}/${id}`, tour as Record<string, unknown>);
};

// Library Meals
export const getLibraryMeals = async (
  limit?: number
): Promise<LibraryMeal[]> => {
  const params: Record<string, unknown> = {
    order: "-createdAt",
  };
  if (limit) {
    params.limit = limit;
  }
  const response = await api.get<{ results: LibraryMeal[] }>(MEAL_BASE_URL, {
    params,
  });
  return response.results;
};

export const getLibraryMeal = async (id: string): Promise<LibraryMeal> => {
  return await api.get<LibraryMeal>(`${MEAL_BASE_URL}/${id}`);
};

export const createLibraryMeal = async (meal: CreateLibraryMealDTO): Promise<LibraryMeal> => {
  return await api.post<LibraryMeal>(MEAL_BASE_URL, meal as Record<string, unknown>);
};

export const updateLibraryMeal = async (id: string, meal: UpdateLibraryMealDTO): Promise<LibraryMeal> => {
  return await api.put<LibraryMeal>(`${MEAL_BASE_URL}/${id}`, meal as Record<string, unknown>);
};

// Library Dishes
export const getLibraryDishes = async (
  limit?: number
): Promise<LibraryDish[]> => {
  const params: Record<string, unknown> = {
    order: "-createdAt",
  };
  if (limit) {
    params.limit = limit;
  }
  const response = await api.get<{ results: LibraryDish[] }>(DISH_BASE_URL, {
    params,
  });
  return response.results;
};

export const getLibraryDish = async (id: string): Promise<LibraryDish> => {
  return await api.get<LibraryDish>(`${DISH_BASE_URL}/${id}`);
};

export const createLibraryDish = async (dish: CreateLibraryDishDTO): Promise<LibraryDish> => {
  return await api.post<LibraryDish>(DISH_BASE_URL, dish as Record<string, unknown>);
};

export const updateLibraryDish = async (id: string, dish: UpdateLibraryDishDTO): Promise<LibraryDish> => {
  return await api.put<LibraryDish>(`${DISH_BASE_URL}/${id}`, dish as Record<string, unknown>);
};
