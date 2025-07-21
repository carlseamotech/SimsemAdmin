import { z } from "zod";

export const tourPackageSchema = z.object({
  fromPerson: z.string(),
  toPerson: z.string(),
  cost: z.string(),
});

export type TourPackage = z.infer<typeof tourPackageSchema>;
