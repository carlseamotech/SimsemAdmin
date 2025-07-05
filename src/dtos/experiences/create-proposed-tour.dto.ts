import { ProposedTour } from "@/models/proposed-tour";

export type CreateProposedTourDTO = Omit<
  ProposedTour,
  "objectId" | "createdAt" | "updatedAt"
>;