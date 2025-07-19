import { Country } from "@/models/country";
import api from "@/services/api";

export interface CountriesResponse {
  results: Country[];
}

export const getCountries = async (): Promise<CountriesResponse> => {
  const response = await api.get<CountriesResponse>("/classes/Country", {
    params: {
      limit: 200,
    },
  });
  return response;
};
