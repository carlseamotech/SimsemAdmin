import { z } from "zod";

export const createDiningExperienceSchema = z.object({
  name: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  coverImageUrl: z.string(),
  hostId: z.string(),
  thingsToKnow: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
  courses: z.array(z.object({
    name: z.string(),
    dishes: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      ingredients: z.string(),
      imageUrl: z.string(),
      course: z.string(),
      type: z.string(),
      isSpecial: z.boolean(),
      isChecked: z.boolean(),
    })),
  })),
  cost: z.string(),
  mealDuration: z.string(),
  kitchenTimes: z.array(z.string()),
  meetingPoint: z.string(),
  meetingPointLat: z.number(),
  meetingPointLong: z.number(),
  cameraZoom: z.number(),
  isCustomMeal: z.boolean(),
  isActive: z.boolean(),
});

export type CreateDiningExperienceDTO = z.infer<typeof createDiningExperienceSchema>;