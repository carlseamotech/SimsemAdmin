import useSWR from "swr";
import { getCountries } from "@/services/countries";

export const useCountries = () => {
  const { data, error } = useSWR("/classes/Country", getCountries);

  return {
    countries: data?.results || [],
    isLoading: !error && !data,
    isError: error,
  };
};
