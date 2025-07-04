export interface CreateCustomTourDTO {
  country: string;
  cost: string;
  city: string;
  difficultyLevel: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  galleryVideoUrls: string[];
  guideId: string;
  description: string;
  tourFeatures: string[];
  cameraZoom: number;
  maxGuest: string;
  type: 'custom';
  meetingPointLat: number;
  otherTourFeature?: string;
  meetingPoint: string;
  phone: string;
  countryCode: string;
  name: string;
  meetingPointLong: number;
  tourTimes: string[];
  tourDuration: string;
  itinerary: Record<string, { schedule: string; activity: string; description: string }[]>;
}
