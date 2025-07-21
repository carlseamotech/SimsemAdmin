"use client";
import { getLibraryTours } from "@/services";
import useSWR from "swr";

export const useLibraryTours = (searchTerm?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/library/tours?search=${searchTerm}`,
    () => getLibraryTours(searchTerm)
  );

  return {
    tours: data?.results ?? [],
    isLoading,
    isError: error,
    mutate,
  };
};
