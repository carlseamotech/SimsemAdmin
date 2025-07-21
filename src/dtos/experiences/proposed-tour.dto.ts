import { z } from "zod";

export const proposedTourSchema = z.object({
  name: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  coverImageUrl: z.string().optional(),
  galleryImageUrls: z.array(z.string()).optional(),
  galleryVideoUrls: z.array(z.object({
    name: z.string(),
    thumbnailUrl: z.string(),
  })).optional(),
  guideId: z.string(),
  tourFeatures: z.array(z.string()).optional(),
  otherTourFeature: z.string().optional(),
  difficultyLevel: z.string().optional(),
  whatToExpect: z.string().optional(),
  thingsToKnow: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  itinerary: z.array(z.object({
    day: z.string(),
    title: z.string(),
    description: z.string(),
  })).optional(),
  tourPackages: z.array(z.object({
    fromPerson: z.string(),
    toPerson: z.string(),
    cost: z.string(),
  })).optional(),
  tourDuration: z.string().optional(),
  tourTimes: z.array(z.string()).optional(),
  meetingPoint: z.string().optional(),
  meetingPointLat: z.number().optional(),
  meetingPointLong: z.number().optional(),
  cameraZoom: z.number().optional(),
  phone: z.string().optional(),
  countryCode: z.string().optional(),
  isActive: z.boolean().optional(),
  isApproved: z.boolean().optional(),
});

export type ProposedTourDTO = z.infer<typeof proposedTourSchema>;
