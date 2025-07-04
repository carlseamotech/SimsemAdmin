import { z } from "zod";

export const hostSchema = z.object({
  objectId: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "About section must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  firstLanguage: z.string().min(1, "First language is required"),
  firstLanguageLevel: z.enum(["Beginner", "Intermediate", "Advance", "Native"]),
  secondLanguage: z.string().optional(),
  secondLanguageLevel: z.enum(["Beginner", "Intermediate", "Advance", "Native"]).optional(),
  thirdLanguage: z.string().optional(),
  thirdLanguageLevel: z.enum(["Beginner", "Intermediate", "Advance", "Native"]).optional(),
  isVerified: z.boolean(),
  imageUrl: z.string().url().optional(),
  imageFile: z.any().optional(),
});

export type HostFormData = z.infer<typeof hostSchema>;
