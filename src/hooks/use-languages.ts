import useSWR from "swr";
import { getLanguages } from "@/services/languages";

export const useLanguages = () => {
  const { data, error } = useSWR("/classes/Language", getLanguages);

  return {
    languages: data?.results || [],
    isLoading: !error && !data,
    isError: error,
  };
};
