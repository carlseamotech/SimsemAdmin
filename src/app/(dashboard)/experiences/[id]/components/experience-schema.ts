import { z } from "zod";

export const experienceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  tourDuration: z.string().min(1, "Duration is required"),
  difficultyLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  tourFeatures: z.array(z.string()),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
