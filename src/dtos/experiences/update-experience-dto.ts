export interface UpdateExperienceDTO {
  isApproved?: boolean;
  isActive?: boolean;
  name?: string;
  description?: string;
  country?: string;
  city?: string;
  tourDuration?: string;
  difficultyLevel?: "Basic" | "Beginner" | "Intermediate" | "Advanced";
  tourFeatures?: string[];
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  whatToExpect?: string;
  cost?: string;
  tourPackages?: string[];
  meetingPoint?: string;
  tourTimes?: string[];
  inclusions?: string[];
  exclusions?: string[];
  thingsToKnow?: string[];
}
