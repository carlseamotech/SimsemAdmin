import useSWR from "swr";
import { getLibraryDishes } from "@/services";

export const useLibraryDishes = () => {
  const { data, error, mutate } = useSWR("/library/dishes", () =>
    getLibraryDishes(1000, 0)
  );

  return {
    dishes: data?.results || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
