import { z } from "zod";

export const updateHostPaymentSchema = z.object({
  iban: z.string().optional(),
  bankName: z.string().optional(),
  accountHolderName: z.string().optional(),
});

export type UpdateHostPaymentDTO = z.infer<typeof updateHostPaymentSchema>;
