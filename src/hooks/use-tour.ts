import useSWR from "swr";
import { getTour } from "@/services/experiences";

export const useTour = (id: string) => {
  const { data, error } = useSWR(id ? `/tours/${id}` : null, () => getTour(id));
  return {
    tour: data,
    isLoading: !error && !data,
    isError: error,
  };
};
