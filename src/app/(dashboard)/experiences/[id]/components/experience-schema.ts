import { z } from "zod";

export const experienceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  tourDuration: z.string().min(1, "Duration is required"),
  difficultyLevel: z.enum(["Basic", "Intermediate", "Advanced"]),
  tourFeatures: z.array(z.string()),
});

export const gallerySchema = z.object({
  galleryImageUrls: z.array(z.string()).optional(),
});

export const coverPhotoSchema = z.object({
  coverImageUrl: z.string().min(1, "Cover image is required"),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type GalleryFormData = z.infer<typeof gallerySchema>;
export type CoverPhotoFormData = z.infer<typeof coverPhotoSchema>;
