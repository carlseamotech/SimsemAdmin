import api from "@/services/api";
import { CreateDiningExperienceDTO } from "@/dtos/experiences/create-dining-experience.dto";
import { Meal } from "@/models/meal";

const BASE_URL = "/classes/SelectedMeal";

export const createDiningExperience = async (
  meal: CreateDiningExperienceDTO
): Promise<Meal> => {
  return await api.post<Meal>(BASE_URL, meal);
};
