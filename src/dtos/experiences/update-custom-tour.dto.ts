export interface UpdateCustomTourDTO {
  country?: string;
  cost?: string;
  city?: string;
  difficultyLevel?: string;
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  galleryVideoUrls?: string[];
  description?: string;
  tourFeatures?: string[];
  cameraZoom?: number;
  maxGuest?: string;
  meetingPointLat?: number;
  otherTourFeature?: string;
  meetingPoint?: string;
  countryCode?: string;
  name?: string;
  meetingPointLong?: number;
  tourTimes?: string[];
  tourDuration?: string;
  itinerary?: Record<string, { schedule: string; activity: string; description: string }[]>;
}
