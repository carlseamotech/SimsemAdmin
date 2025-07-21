export interface CreateCustomTourDTO {
  country: string;
  city: string;
  difficultyLevel: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  galleryVideoUrls?: { name: string; thumbnailUrl: string }[];
  guideId: string;
  description: string;
  tourFeatures: string[];
  cameraZoom: number;
  maxGuest?: string;
  type: "custom";
  meetingPointLat: number;
  otherTourFeature?: string;
  meetingPoint: string;
  phone: string;
  countryCode: string;
  name: string;
  meetingPointLong: number;
  tourTimes: string[];
  tourDuration: string;
  itinerary: string[];
  thingsToKnow: string[];
  inclusions: string[];
  exclusions: string[];
  whatToExpect: string;
  tourPackages: string[];
}
