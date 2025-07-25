import {
  createDiningExperience,
  createLibraryDish,
  createLibraryMeal,
  createLibraryTour,
  deleteMeal,
  getLibraryDish,
  getLibraryDishes,
  getLibraryMeal,
  getLibraryMeals,
  getLibraryTour,
  getLibraryTours,
  getMeal,
  getMeals,
  updateMeal,
  updateLibraryDish,
  updateLibraryMeal,
  updateLibraryTour,
} from "@/services";
import {
  CreateDiningExperienceDTO,
  CreateLibraryDishDTO,
  CreateLibraryMealDTO,
  CreateLibraryTourDTO,
  UpdateDiningExperienceDTO,
  UpdateLibraryDishDTO,
  UpdateLibraryMealDTO,
  UpdateLibraryTourDTO,
} from "@/dtos";
import { useState } from "react";
import useSWR from "swr";

// Meals
export const useMeals = (limit?: number) => {
  const { data, error, mutate } = useSWR(["/meals", limit], () =>
    getMeals(limit || 10, 0, {})
  );
  return {
    meals: data?.results || [],
    isLoading: !error && !data,
    isError: error,
    createMeal: async (meal: CreateDiningExperienceDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const newMeal = await createDiningExperience(meal, token);
      mutate();
      return newMeal;
    },
    updateMeal: async (id: string, meal: UpdateDiningExperienceDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const updatedMeal = await updateMeal(id, meal, token);
      mutate();
      return updatedMeal;
    },
    deleteMeal: async (id: string) => {
      await deleteMeal(id);
      mutate();
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
export const useLibraryTours = (searchTerm?: string, country?: string) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/library-tours", page, limit, searchTerm, country],
    () => getLibraryTours(searchTerm, country, limit, (page - 1) * limit)
  );

  return {
    libraryTours: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    createLibraryTour: async (tour: CreateLibraryTourDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const newTour = await createLibraryTour(tour, token);
      mutate();
      return newTour;
    },
    updateLibraryTour: async (id: string, tour: UpdateLibraryTourDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const updatedTour = await updateLibraryTour(id, tour, token);
      mutate();
      return updatedTour;
    },
    mutate,
  };
};

export const useLibraryTour = (id: string) => {
  const { data, error } = useSWR(`/library-tours/${id}`, () =>
    getLibraryTour(id)
  );
  return {
    libraryTour: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Library Meals
export const useLibraryMeals = (searchTerm?: string, country?: string) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/library-meals", page, limit, searchTerm, country],
    () => getLibraryMeals(searchTerm, country, limit, (page - 1) * limit)
  );

  return {
    libraryMeals: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    createLibraryMeal: async (meal: CreateLibraryMealDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const newMeal = await createLibraryMeal(meal, token);
      mutate();
      return newMeal;
    },
    updateLibraryMeal: async (id: string, meal: UpdateLibraryMealDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const updatedMeal = await updateLibraryMeal(id, meal, token);
      mutate();
      return updatedMeal;
    },
    mutate,
  };
};

export const useLibraryMeal = (id: string) => {
  const { data, error } = useSWR(`/library-meals/${id}`, () =>
    getLibraryMeal(id)
  );
  return {
    libraryMeal: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// Library Dishes
export const useLibraryDishes = (searchTerm?: string, country?: string) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/library-dishes", page, limit, searchTerm, country],
    () => getLibraryDishes(searchTerm, country, limit, (page - 1) * limit)
  );

  return {
    libraryDishes: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    createLibraryDish: async (dish: CreateLibraryDishDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const newDish = await createLibraryDish(dish, token);
      mutate();
      return newDish;
    },
    updateLibraryDish: async (id: string, dish: UpdateLibraryDishDTO) => {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      const updatedDish = await updateLibraryDish(id, dish, token);
      mutate();
      return updatedDish;
    },
    mutate,
  };
};

export const useLibraryDish = (id: string) => {
  const { data, error } = useSWR(`/library-dishes/${id}`, () =>
    getLibraryDish(id)
  );
  return {
    libraryDish: data,
    isLoading: !error && !data,
    isError: error,
  };
};
