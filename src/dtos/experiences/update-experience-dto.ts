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
}
