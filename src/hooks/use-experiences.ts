import {
  createTour,
  deleteTour,
  getTours,
  updateTour,
} from "@/services/experiences";
import {
  CreateProposedTourDTO,
  UpdateProposedTourDTO,
} from "@/dtos/experiences";
import toast from "react-hot-toast";
import { ApiError } from "@/services/types";
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
import useSWR from "swr";

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

  const createTourHandler = async (tour: CreateProposedTourDTO) => {
    try {
      const newTour = await createTour(tour);
      mutate();
      toast.success("Experience created successfully");
      return newTour;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to create experience"
      );
    }
  };

  const updateTourHandler = async (
    id: string,
    tour: UpdateProposedTourDTO
  ) => {
    try {
      await updateTour(id, tour);
      mutate();
      toast.success("Experience updated successfully");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to update experience"
      );
    }
  };

  const deleteTourHandler = async (id: string) => {
    try {
      await deleteTour(id);
      mutate();
      toast.success("Experience deleted successfully");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to delete experience"
      );
    }
  };

  return {
    tours: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    createTour: createTourHandler,
    updateTour: updateTourHandler,
    deleteTour: deleteTourHandler,
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
export const useLibraryTours = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/library-tours", page, limit],
    () => getLibraryTours(limit, (page - 1) * limit)
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
      const newTour = await createLibraryTour(tour);
      mutate();
      return newTour;
    },
    updateLibraryTour: async (id: string, tour: UpdateLibraryTourDTO) => {
      const updatedTour = await updateLibraryTour(id, tour);
      mutate();
      return updatedTour;
    },
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
export const useLibraryMeals = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/library-meals", page, limit],
    () => getLibraryMeals(limit, (page - 1) * limit)
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
      const newMeal = await createLibraryMeal(meal);
      mutate();
      return newMeal;
    },
    updateLibraryMeal: async (id: string, meal: UpdateLibraryMealDTO) => {
      const updatedMeal = await updateLibraryMeal(id, meal);
      mutate();
      return updatedMeal;
    },
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
export const useLibraryDishes = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/library-dishes", page, limit],
    () => getLibraryDishes(limit, (page - 1) * limit)
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
      const newDish = await createLibraryDish(dish);
      mutate();
      return newDish;
    },
    updateLibraryDish: async (id: string, dish: UpdateLibraryDishDTO) => {
      const updatedDish = await updateLibraryDish(id, dish);
      mutate();
      return updatedDish;
    },
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
