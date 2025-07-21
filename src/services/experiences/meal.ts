import api from "../api";
import {
  CreateDiningExperienceDTO,
  UpdateDiningExperienceDTO,
} from "@/dtos";
import { Meal } from "@/models/meal";

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
  const response = await api.get<{ results: Meal[]; count: number }>(
    "/classes/SelectedMeal",
    {
      params: { limit, skip, where: filter, count: 1 },
    }
  );
  return response;
};

export const getMeal = async (id: string): Promise<Meal> => {
  const response = await api.get<Meal>(`/classes/SelectedMeal/${id}`);
  return response;
};

export const createDiningExperience = async (
  data: CreateDiningExperienceDTO
): Promise<Meal> => {
  const response = await api.post<Meal>("/classes/SelectedMeal", data);
  return response;
};

export const updateMeal = async (
  id: string,
  data: UpdateDiningExperienceDTO
): Promise<Meal> => {
  const response = await api.put<Meal>(`/classes/SelectedMeal/${id}`, data);
  return response;
};

export const deleteMeal = async (id: string): Promise<void> => {
  await api.delete(`/classes/SelectedMeal/${id}`);
};