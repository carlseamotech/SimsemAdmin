import useSWR from "swr";
import { getTour } from "@/services";

export const useTour = (id: string) => {
  const { data, error, mutate } = useSWR(id ? `/tours/${id}` : null, () =>
    getTour(id)
  );
  return {
    tour: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
