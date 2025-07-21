export interface CreateCustomTourDTO {
  name: string;
  country: string;
  city: string;
  description: string;
  tourDuration: string;
  difficultyLevel: string;
  tourFeatures: string[];
  otherTourFeature?: string;
  whatToExpect: string;
  inclusions: string[];
  exclusions: string[];
  thingsToKnow: string[]; // Array of stringified JSON
  itinerary: string[]; // Array of stringified JSON
  tourPackages: string[]; // Array of stringified JSON
  meetingPoint: string;
  meetingPointLat: number;
  meetingPointLong: number;
  cameraZoom: number;
  phone: string;
  countryCode: string;
  tourTimes: string[];
  guideId: string;
  type: "custom";
  coverImageUrl: string;
  galleryImageUrls: string[];
  galleryVideoUrls?: { name: string; thumbnailUrl: string }[];
}
