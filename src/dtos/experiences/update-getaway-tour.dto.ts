export interface UpdateGetawayTourDTO {
  country?: string;
  city?: string;
  difficultyLevel?: string;
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  description?: string;
  tourPackages?: string[];
  tourFeatures?: string[];
  otherTourFeature?: string;
  countryCode?: string;
  name?: string;
  tourDuration?: string;
  pickupPoints?: string[];
  galleryVideoUrls?: string[];
  itinerary?: Record<string, { schedule: string; activity: string; description: string }[]>;
}
