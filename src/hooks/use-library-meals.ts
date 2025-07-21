"use client";
import { getLibraryMeals } from "@/services";
import useSWR from "swr";

export const useLibraryMeals = (searchTerm?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/library/meals?search=${searchTerm}`,
    () => getLibraryMeals(searchTerm)
  );

  return {
    meals: data?.results ?? [],
    isLoading,
    isError: error,
    mutate,
  };
};