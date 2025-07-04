export interface Experience {
  objectId: string;
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
  type: string;
  meetingPointLat: number;
  otherTourFeature: string;
  meetingPoint: string;
  phone: string;
  countryCode: string;
  name: string;
  meetingPointLong: number;
  tourTimes: string[];
  tourDuration: string;
  itinerary: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GetawayTour {
  objectId: string;
  country: string;
  city: string;
  difficultyLevel: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  guideId: string;
  description: string;
  tourPackages: string[];
  tourFeatures: string[];
  type: string;
  otherTourFeature: string;
  phone: string;
  countryCode: string;
  name: string;
  tourDuration: string;
  pickupPoints: string[];
  galleryVideoUrls: string[];
  itinerary: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface OfferedTour {
  objectId: string;
  country: string;
  cost: string;
  city: string;
  coverImageUrl: string;
  guideId: string;
  description: string;
  tourFeatures: string[];
  cameraZoom: number;
  type: string;
  meetingPointLat: number;
  meetingPoint: string;
  phone: string;
  maxGuest: string;
  countryCode: string;
  name: string;
  meetingPointLong: number;
  tourTimes: string[];
  tourDuration: string;
  offeredTourId: string;
  isApproved: boolean;
  isNotified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Meal {
  objectId: string;
  country: string;
  courses: string[];
  cost: string;
  kitchenTimes: string[];
  city: string;
  coverImageUrl: string;
  description: string;
  galleryImageUrls: string[];
  galleryVideoUrls: string[];
  guideId: string;
  hostId: string;
  houseRules: string[];
  maxGuest: string;
  name: string;
  phone: string;
  countryCode: string;
  seatingPreference: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryTour {
  objectId: string;
  name: string;
  description: string;
  requirements: string[];
  coverImage: {
    __type: "File";
    name: string;
    url: string;
  };
  country: string;
  cost: number;
  minDuration: number;
  maxDuration: number;
  feature: string;
  timeUnit: string;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryMeal {
  objectId: string;
  name: string;
  description: string;
  dishIds: string[];
  coverImage: {
    __type: "File";
    name: string;
    url: string;
  };
  country: string;
  cost: string;
  createdAt: string;
  updatedAt: string;
}

export interface LibraryDish {
  objectId: string;
  name: string;
  ingredients: string;
  image: {
    __type: "File";
    name: string;
    url: string;
  };
  country: string;
  course: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
