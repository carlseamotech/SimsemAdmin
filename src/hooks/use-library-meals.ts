import useSWR from "swr";
import { getLibraryMeals } from "@/services";

export const useLibraryMeals = () => {
  const { data, error, mutate } = useSWR("/library/meals", () =>
    getLibraryMeals(1000, 0)
  );

  return {
    meals: data?.results || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
