import useSWR from "swr";
import {
  getCustomTours,
  createCustomTour,
  updateCustomTour,
  deleteCustomTour,
  CreateExperienceDTO,
  UpdateExperienceDTO,
} from "@/services/experiences/custom-tour";
import {
  getGetawayTours,
  createGetawayTour,
  updateGetawayTour,
  deleteGetawayTour,
  CreateGetawayTourDTO,
  UpdateGetawayTourDTO,
} from "@/services/experiences/getaway-tour";
import {
  getOfferedTours,
  createOfferedTour,
  updateOfferedTour,
  deleteOfferedTour,
  CreateOfferedTourDTO,
  UpdateOfferedTourDTO,
} from "@/services/experiences/offered-tour";
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

// Custom Tours
export const useCustomTours = () => {
  const { data, error, mutate } = useSWR("/custom-tours", getCustomTours);
  return {
    customTours: data,
    isLoading: !error && !data,
    isError: error,
    createCustomTour: async (tour: CreateExperienceDTO) => {
      const newTour = await createCustomTour(tour);
      mutate((data) => (data ? [...data, newTour] : [newTour]), false);
      return newTour;
    },
    updateCustomTour: async (id: string, tour: UpdateExperienceDTO) => {
      const updatedTour = await updateCustomTour(id, tour);
      mutate(
        (data) =>
          data?.map((t) => (t.objectId === id ? { ...t, ...updatedTour } : t)),
        false
      );
      return updatedTour;
    },
    deleteCustomTour: async (id: string) => {
      await deleteCustomTour(id);
      mutate(
        (data) => data?.filter((t) => t.objectId !== id),
        false
      );
    },
  };
};

// Getaway Tours
export const useGetawayTours = () => {
  const { data, error, mutate } = useSWR("/getaway-tours", getGetawayTours);
  return {
    getawayTours: data,
    isLoading: !error && !data,
    isError: error,
    createGetawayTour: async (tour: CreateGetawayTourDTO) => {
      const newTour = await createGetawayTour(tour);
      mutate((data) => (data ? [...data, newTour] : [newTour]), false);
      return newTour;
    },
    updateGetawayTour: async (id: string, tour: UpdateGetawayTourDTO) => {
      const updatedTour = await updateGetawayTour(id, tour);
      mutate(
        (data) =>
          data?.map((t) => (t.objectId === id ? { ...t, ...updatedTour } : t)),
        false
      );
      return updatedTour;
    },
    deleteGetawayTour: async (id: string) => {
      await deleteGetawayTour(id);
      mutate(
        (data) => data?.filter((t) => t.objectId !== id),
        false
      );
    },
  };
};

// Offered Tours
export const useOfferedTours = () => {
  const { data, error, mutate } = useSWR("/offered-tours", getOfferedTours);
  return {
    offeredTours: data,
    isLoading: !error && !data,
    isError: error,
    createOfferedTour: async (tour: CreateOfferedTourDTO) => {
      const newTour = await createOfferedTour(tour);
      mutate((data) => (data ? [...data, newTour] : [newTour]), false);
      return newTour;
    },
    updateOfferedTour: async (id: string, tour: UpdateOfferedTourDTO) => {
      const updatedTour = await updateOfferedTour(id, tour);
      mutate(
        (data) =>
          data?.map((t) => (t.objectId === id ? { ...t, ...updatedTour } : t)),
        false
      );
      return updatedTour;
    },
    deleteOfferedTour: async (id: string) => {
      await deleteOfferedTour(id);
      mutate(
        (data) => data?.filter((t) => t.objectId !== id),
        false
      );
    },
  };
};

// Meals
export const useMeals = () => {
  const { data, error, mutate } = useSWR("/meals", getMeals);
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
  const { data, error, mutate } = useSWR("/library-tours", getLibraryTours);
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
export const useLibraryMeals = () => {
  const { data, error, mutate } = useSWR("/library-meals", getLibraryMeals);
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
export const useLibraryDishes = () => {
  const { data, error, mutate } = useSWR("/library-dishes", getLibraryDishes);
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
