export interface CreateOfferedTourDTO {
  country: string;
  cost: string;
  city: string;
  coverImageUrl: string;
  guideId: string;
  description: string;
  tourFeatures: string[];
  cameraZoom: number;
  type: 'offered';
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
}
