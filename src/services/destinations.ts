import apiClient from "./api";
import { Destination, DestinationDetails, TopCity, TopCityDetails } from "@/models/destination";

export const getDestinations = async (): Promise<Destination[]> => {
  const response = await apiClient.get<{ results: Destination[] }>("/classes/Destination");
  return response.results;
};

export const getDestinationDetails = async (destinationId: string): Promise<DestinationDetails[]> => {
  const response = await apiClient.get<{ results: DestinationDetails[] }>("/classes/DestinationDetails", {
    params: { where: { destinationId } },
  });
  return response.results;
};

export const getTopCities = async (destinationId: string): Promise<TopCity[]> => {
  const response = await apiClient.get<{ results: TopCity[] }>("/classes/TopCity", {
    params: { where: { destinationId } },
  });
  return response.results;
};

export const getTopCityDetails = async (cityId: string): Promise<TopCityDetails[]> => {
  const response = await apiClient.get<{ results: TopCityDetails[] }>("/classes/TopCityDetails", {
    params: { where: { cityId } },
  });
  return response.results;
};
