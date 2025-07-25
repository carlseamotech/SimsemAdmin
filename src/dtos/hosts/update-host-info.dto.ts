import { z } from "zod";

export const updateHostInfoSchema = z.object({
  city: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  idFrontFileUrl: z.string().optional(),
  idBackFileUrl: z.string().optional(),
  certificateFileUrl: z.string().optional(),
  firstLanguage: z.string().optional(),
  secondLanguage: z.string().optional(),
  thirdLanguage: z.string().optional(),
  firstLanguageLevel: z.string().optional(),
  secondLanguageLevel: z.string().optional(),
  thirdLanguageLevel: z.string().optional(),
});

export type UpdateHostInfoDTO = z.infer<typeof updateHostInfoSchema>;