import { ProposedTour } from "@/models/proposed-tour";
import api from "../api";

export interface GetToursFilter {
  where?: {
    type?: { $in: string[] };
    objectId?: string;
    guideId?: string;
    country?: string;
  };
}

export const getTours = async (
  limit: number,
  skip: number,
  filter: GetToursFilter
): Promise<{ results: ProposedTour[]; count: number }> => {
  const response = await api.get<{ results: ProposedTour[]; count: number }>(
    "/classes/ProposedTour",
    {
      params: { limit, skip, ...filter, count: 1 },
    }
  );
  return response;
};

export const getTour = async (id: string): Promise<ProposedTour> => {
  const response = await api.get<ProposedTour>(`/classes/ProposedTour/${id}`);
  return response;
};

export const deleteTour = async (id: string): Promise<void> => {
  await api.delete(`/classes/ProposedTour/${id}`);
};
