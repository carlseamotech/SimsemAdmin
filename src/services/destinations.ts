import { Destination, DestinationDetails, TopCity, TopCityDetails } from "@/models/destination";
import api from "./api";

export const getDestinations = async (): Promise<{ results: Destination[] }> => {
  return api.get<{ results: Destination[] }>("/classes/Destination");
};

export const getDestinationDetails = async (destinationId: string): Promise<{ results: DestinationDetails[] }> => {
  return api.get<{ results: DestinationDetails[] }>("/classes/DestinationDetails", {
    params: { where: { destinationId } },
  });
};

export const getTopCities = async (destinationId: string): Promise<{ results: TopCity[] }> => {
  return api.get<{ results: TopCity[] }>("/classes/TopCity", {
    params: { where: { destinationId } },
  });
};

export const getTopCityDetails = async (cityId: string): Promise<{ results: TopCityDetails[] }> => {
  return api.get<{ results: TopCityDetails[] }>("/classes/TopCityDetails", {
    params: { where: { cityId } },
  });
};

