export interface CreateDiningExperienceDTO {
  country: string;
  courses: string[];
  cost: string;
  kitchenTimes: string[];
  city: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  galleryVideoUrls: string[];
  guideId: string;
  description: string;
  maxGuest: string;
  type: 'meal';
  meetingPointLat: number;
  meetingPoint: string;
  phone: string;
  countryCode: string;
  name: string;
  meetingPointLong: number;
  isNotified: boolean;
  isActive: boolean;
}
