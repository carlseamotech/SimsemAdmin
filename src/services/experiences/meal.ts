import api from "../api";
import { Meal } from "@/models/experience";

const BASE_URL = "/classes/SelectedMeal";

export type CreateMealDTO = Omit<Meal, "objectId" | "createdAt" | "updatedAt">;
export type UpdateMealDTO = Partial<Omit<Meal, "objectId" | "createdAt" | "updatedAt">>;

export const getMeals = async (): Promise<Meal[]> => {
  const response = await api.get<{ results: Meal[] }>(BASE_URL);
  return response.results;
};

export const getMeal = async (id: string): Promise<Meal> => {
  return await api.get<Meal>(`${BASE_URL}/${id}`);
};

export const createMeal = async (meal: CreateMealDTO): Promise<Meal> => {
  return await api.post<Meal>(BASE_URL, meal as Record<string, unknown>);
};

export const updateMeal = async (id: string, meal: UpdateMealDTO): Promise<Meal> => {
  return await api.put<Meal>(`${BASE_URL}/${id}`, meal as Record<string, unknown>);
};

export const deleteMeal = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
