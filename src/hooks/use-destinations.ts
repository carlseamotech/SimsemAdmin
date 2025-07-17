import useSWR from "swr";
import * as destinationsService from "@/services/destinations";

export const useDestinations = () => {
  const { data, error } = useSWR("/classes/Destination", destinationsService.getDestinations);

  return {
    destinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDestinationDetails = (destinationId: string) => {
  const { data, error } = useSWR(
    destinationId ? ["/classes/DestinationDetails", destinationId] : null,
    () => destinationsService.getDestinationDetails(destinationId)
  );

  return {
    destinationDetails: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTopCities = (destinationId: string) => {
  const { data, error } = useSWR(
    destinationId ? ["/classes/TopCity", destinationId] : null,
    () => destinationsService.getTopCities(destinationId)
  );

  return {
    topCities: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTopCityDetails = (cityId: string) => {
  const { data, error } = useSWR(
    cityId ? ["/classes/TopCityDetails", cityId] : null,
    () => destinationsService.getTopCityDetails(cityId)
  );

  return {
    topCityDetails: data,
    isLoading: !error && !data,
    isError: error,
  };
};
