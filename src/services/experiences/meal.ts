import api from "../api";
import {
  CreateDiningExperienceDTO,
  UpdateDiningExperienceDTO,
} from "@/dtos";
import { Meal } from "@/models/meal";

export const getMeals = async (
  limit: number,
  skip: number,
  filter: any
): Promise<{ results: Meal[]; count: number }> => {
  const response = await api.get("/classes/SelectedMeal", {
    params: { limit, skip, where: filter, count: 1 },
  });
  return response.data;
};

export const getMeal = async (id: string): Promise<Meal> => {
  const response = await api.get(`/classes/SelectedMeal/${id}`);
  return response.data;
};

export const createDiningExperience = async (
  data: CreateDiningExperienceDTO
): Promise<Meal> => {
  const response = await api.post("/classes/SelectedMeal", data);
  return response.data;
};

export const updateMeal = async (
  id: string,
  data: UpdateDiningExperienceDTO
): Promise<Meal> => {
  const response = await api.put(`/classes/SelectedMeal/${id}`, data);
  return response.data;
};

export const deleteMeal = async (id: string): Promise<void> => {
  await api.delete(`/classes/SelectedMeal/${id}`);
};