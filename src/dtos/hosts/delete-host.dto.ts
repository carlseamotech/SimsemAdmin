import { z } from "zod";

export const deleteHostSchema = z.object({
  phone: z.string(),
  userType: z.literal("service_provider"),
});

export type DeleteHostDTO = z.infer<typeof deleteHostSchema>;
