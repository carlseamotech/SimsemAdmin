import api from "../api";
import { Meal } from "@/models/meal";

const BASE_URL = "/classes/SelectedMeal";

export type CreateMealDTO = Omit<Meal, "objectId" | "createdAt" | "updatedAt">;
export type UpdateMealDTO = Partial<Omit<Meal, "objectId" | "createdAt" | "updatedAt">>;

export const getMeals = async (limit?: number): Promise<Meal[]> => {
  const params: Record<string, unknown> = {
    order: "-createdAt",
  };
  if (limit) {
    params.limit = limit;
  }
  const response = await api.get<{ results: Meal[] }>(BASE_URL, { params });
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
