import { ProposedTour } from "@/models/proposed-tour";
import { Meal } from "@/models/meal";
import apiClient from "./api";

export const getTours = async (
  limit?: number,
  skip?: number
): Promise<{ results: ProposedTour[]; count: number }> => {
  const response = await apiClient.get<{ results: ProposedTour[]; count: number }>(
    "/classes/ProposedTour",
    {
      params: { limit, skip, count: 1 },
    }
  );
  return response;
};

export const getMeals = async (
  limit?: number,
  skip?: number
): Promise<{ results: Meal[]; count: number }> => {
  const response = await apiClient.get<{ results: Meal[]; count: number }>(
    "/classes/SelectedMeal",
    {
      params: { limit, skip, count: 1 },
    }
  );
  return response;
};
