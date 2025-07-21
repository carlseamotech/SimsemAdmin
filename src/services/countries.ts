import { Country } from "@/models/country";
import api from "./api";

export const getCountries = async (): Promise<{ results: Country[] }> => {
  const response = await api.get<{ results: Country[] }>("/classes/Country", {
    params: {
      limit: 200,
    },
  });
  return response;
};

