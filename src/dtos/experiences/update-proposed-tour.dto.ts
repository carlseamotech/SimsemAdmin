import { ProposedTour } from "@/models/proposed-tour";

export type UpdateProposedTourDTO = Partial<
  Omit<ProposedTour, "objectId" | "createdAt" | "updatedAt">
>;