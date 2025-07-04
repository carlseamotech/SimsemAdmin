export interface CreateGetawayTourDTO {
  country: string;
  city: string;
  difficultyLevel: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  guideId: string;
  description: string;
  tourPackages: string[];
  tourFeatures: string[];
  type: 'getaway';
  otherTourFeature?: string;
  phone: string;
  countryCode: string;
  name: string;
  tourDuration: string;
  pickupPoints: string[];
  galleryVideoUrls: string[];
  itinerary: Record<string, { schedule: string; activity: string; description: string }[]>;
}
