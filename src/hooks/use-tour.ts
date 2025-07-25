import useSWR from "swr";
import {
  getTour,
  updateCustomTour,
  updateGetawayTour,
  updateOfferedTour,
} from "@/services";
import {
  UpdateCustomTourDTO,
  UpdateGetawayTourDTO,
  UpdateOfferedTourDTO,
} from "@/dtos";

export const useTour = (id: string) => {
  const { data, error, mutate } = useSWR(id ? `/tours/${id}` : null, () =>
    getTour(id)
  );

  const updateTour = async (
    data: UpdateCustomTourDTO | UpdateGetawayTourDTO | UpdateOfferedTourDTO
  ) => {
    const token = localStorage.getItem("sessionToken");
    if (!token) throw new Error("No session token found");

    if (data.type === "custom") {
      await updateCustomTour(id, data as UpdateCustomTourDTO, token);
    } else if (data.type === "getaway") {
      await updateGetawayTour(id, data as UpdateGetawayTourDTO, token);
    } else if (data.type === "offered") {
      await updateOfferedTour(id, data as UpdateOfferedTourDTO, token);
    }
    mutate();
  };

  return {
    tour: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    updateTour,
  };
};
