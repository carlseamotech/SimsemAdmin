"use client";
import { getLibraryDishes } from "@/services";
import useSWR from "swr";

export const useLibraryDishes = (searchTerm?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/library/dishes?search=${searchTerm}`,
    () => getLibraryDishes(searchTerm)
  );

  return {
    dishes: data?.results ?? [],
    isLoading,
    isError: error,
    mutate,
  };
};