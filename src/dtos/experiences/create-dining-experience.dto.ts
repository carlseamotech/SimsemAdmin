export interface CreateDiningExperienceDTO {
  country: string;
  courses: string[];
  cost: string;
  kitchenTimes: string[];
  city: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  guideId: string;
  description: string;
  maxGuest: string;
  phone: string;
  countryCode: string;
  name: string;
  isActive: boolean;
  isNotified: boolean;
  isApproved: boolean;
}