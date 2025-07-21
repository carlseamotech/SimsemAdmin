"use client";
import useSWR from "swr";
import {
  getLibraryTour,
  getLibraryMeal,
  getLibraryDish,
} from "@/services";
import { useParams, useSearchParams } from "next/navigation";
import { LibraryTour, LibraryMeal, LibraryDish } from "@/models/library";

export const useLibraryItem = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const fetcher = (): Promise<LibraryTour | LibraryMeal | LibraryDish> => {
    if (type === "meal") {
      return getLibraryMeal(id as string);
    }
    if (type === "dish") {
      return getLibraryDish(id as string);
    }
    return getLibraryTour(id as string);
  };

  const { data, error, mutate } = useSWR(
    `/library/${id}?type=${type}`,
    fetcher
  );

  return {
    item: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    type,
  };
};
