import useSWR from "swr";
import { getTours, getMeals} from "@/services";
import { useState } from "react";

export const useDashboard = () => {
  const [toursPage, setToursPage] = useState(1);
  const [toursLimit, setToursLimit] = useState(7);
  const [mealsPage, setMealsPage] = useState(1);
  const [mealsLimit, setMealsLimit] = useState(8);

  const { data: toursData, error: toursError } = useSWR(
    ["/classes/ProposedTour", toursPage, toursLimit],
    () => getTours(toursLimit, (toursPage - 1) * toursLimit, {})
  );

  const { data: mealsData, error: mealsError } = useSWR(
    ["/classes/SelectedMeal", mealsPage, mealsLimit],
    () => getMeals(mealsLimit, (mealsPage - 1) * mealsLimit, {})
  );

  return {
    tours: toursData?.results,
    toursCount: toursData?.count,
    meals: mealsData?.results,
    mealsCount: mealsData?.count,
    isLoading: (!toursData && !toursError) || (!mealsData && !mealsError),
    isError: toursError || mealsError,
    toursPage,
    setToursPage,
    toursLimit,
    setToursLimit,
    mealsPage,
    setMealsPage,
    mealsLimit,
    setMealsLimit,
  };
};
