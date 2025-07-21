export interface ProposedTour {
  objectId: string;
  country: string;
  cost: string;
  city: string;
  difficultyLevel: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  guideId: string;
  description: string;
  tourFeatures: string[];
  cameraZoom: number;
  type: "custom" | "getaway" | "offered";
  meetingPointLat: number;
  otherTourFeature: string;
  meetingPoint: string;
  phone: string;
  countryCode: string;
  name: string;
  meetingPointLong: number;
  tourTimes: string[];
  tourDuration: string;
  isApproved: boolean;
  isNotified: boolean;
  isActive: boolean;
  tourPackages: { fromPerson: string; toPerson: string; cost: string }[];
  pickupPoints: {
    value: {
      cameraZoom: number;
      pickupPointTitle: string;
      pickupPoint: string;
      pickupPointLat: number;
      pickupPointLong: number;
    };
    key: string;
  }[];
  createdAt: string;
  updatedAt: string;
  offeredTourId?: string;
  maxGuest?: string;
  thingsToKnow?: { title: string; description: string }[];
  exclusions?: string[];
  inclusions?: string[];
  itinerary?: { title: string; description: string; day: string }[];
  whatToExpect?: string;
  courses?: string[];
}
