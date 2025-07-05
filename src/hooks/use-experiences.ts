import useSWR from "swr";
import { getTours } from "@/services/experiences";
import {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
  CreateMealDTO,
  UpdateMealDTO,
} from "@/services/experiences/meal";
import {
  getLibraryTours,
  getLibraryTour,
  createLibraryTour,
  updateLibraryTour,
  CreateLibraryTourDTO,
  UpdateLibraryTourDTO,
  getLibraryMeals,
  getLibraryMeal,
  createLibraryMeal,
  updateLibraryMeal,
  CreateLibraryMealDTO,
  UpdateLibraryMealDTO,
  getLibraryDishes,
  getLibraryDish,
  createLibraryDish,
  updateLibraryDish,
  CreateLibraryDishDTO,
  UpdateLibraryDishDTO,
} from "@/services/experiences/library";
import { useState } from "react";

export const useTours = (types: string[], enabled: boolean = true) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    enabled ? ["/tours", types.join(","), page, limit] : null,
    () =>
      getTours(limit, (page - 1) * limit, {
        where: { type: { $in: types } },
      })
  );

  return {
    tours: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    mutate,
  };
};

// Meals
export const useMeals = (limit?: number) => {
  const { data, error, mutate } = useSWR(["/meals", limit], () =>
    getMeals(limit)
  );
  return {
    meals: data,
    isLoading: !error && !data,
    isError: error,
    createMeal: async (meal: CreateMealDTO) => {
      const newMeal = await createMeal(meal);
      mutate((data) => (data ? [...data, newMeal] : [newMeal]), false);
      return newMeal;
    },
    updateMeal: async (id: string, meal: UpdateMealDTO) => {
      const updatedMeal = await updateMeal(id, meal);
      mutate(
        (data) =>
          data?.map((m) => (m.objectId === id ? { ...m, ...updatedMeal } : m)),
        false
      );
      return updatedMeal;
    },
    deleteMeal: async (id: string) => {
      await deleteMeal(id);
      mutate(
        (data) => data?.filter((m) => m.objectId !== id),
        false
      );
    },
  };
};

export const useMeal = (id: string) => {
  const { data, error } = useSWR(`/meals/${id}`, () => getMeal(id));
  return {
    meal: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Library Tours
export const useLibraryTours = (limit?: number) => {
  const { data, error, mutate } = useSWR(["/library-tours", limit], () =>
    getLibraryTours(limit)
  );
  return {
    libraryTours: data,
    isLoading: !error && !data,
    isError: error,
    createLibraryTour: async (tour: CreateLibraryTourDTO) => {
      const newTour = await createLibraryTour(tour);
      mutate((data) => (data ? [...data, newTour] : [newTour]), false);
      return newTour;
    },
    updateLibraryTour: async (id: string, tour: UpdateLibraryTourDTO) => {
      const updatedTour = await updateLibraryTour(id, tour);
      mutate(
        (data) =>
          data?.map((t) => (t.objectId === id ? { ...t, ...updatedTour } : t)),
        false
      );
      return updatedTour;
    },
  };
};

export const useLibraryTour = (id: string) => {
  const { data, error } = useSWR(`/library-tours/${id}`, () => getLibraryTour(id));
  return {
    libraryTour: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Library Meals
export const useLibraryMeals = (limit?: number) => {
  const { data, error, mutate } = useSWR(["/library-meals", limit], () =>
    getLibraryMeals(limit)
  );
  return {
    libraryMeals: data,
    isLoading: !error && !data,
    isError: error,
    createLibraryMeal: async (meal: CreateLibraryMealDTO) => {
      const newMeal = await createLibraryMeal(meal);
      mutate((data) => (data ? [...data, newMeal] : [newMeal]), false);
      return newMeal;
    },
    updateLibraryMeal: async (id: string, meal: UpdateLibraryMealDTO) => {
      const updatedMeal = await updateLibraryMeal(id, meal);
      mutate(
        (data) =>
          data?.map((m) => (m.objectId === id ? { ...m, ...updatedMeal } : m)),
        false
      );
      return updatedMeal;
    },
  };
};

export const useLibraryMeal = (id: string) => {
  const { data, error } = useSWR(`/library-meals/${id}`, () => getLibraryMeal(id));
  return {
    libraryMeal: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Library Dishes
export const useLibraryDishes = (limit?: number) => {
  const { data, error, mutate } = useSWR(["/library-dishes", limit], () =>
    getLibraryDishes(limit)
  );
  return {
    libraryDishes: data,
    isLoading: !error && !data,
    isError: error,
    createLibraryDish: async (dish: CreateLibraryDishDTO) => {
      const newDish = await createLibraryDish(dish);
      mutate((data) => (data ? [...data, newDish] : [newDish]), false);
      return newDish;
    },
    updateLibraryDish: async (id: string, dish: UpdateLibraryDishDTO) => {
      const updatedDish = await updateLibraryDish(id, dish);
      mutate(
        (data) =>
          data?.map((d) => (d.objectId === id ? { ...d, ...updatedDish } : d)),
        false
      );
      return updatedDish;
    },
  };
};

export const useLibraryDish = (id: string) => {
  const { data, error } = useSWR(`/library-dishes/${id}`, () => getLibraryDish(id));
  return {
    libraryDish: data,
    isLoading: !error && !data,
    isError: error,
  };
};
