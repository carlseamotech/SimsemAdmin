export interface Dish {
  objectId: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  id: string;
  ingredients: string;
  course: string;
  isSpecial: boolean;
  isChecked: boolean;
}

export interface FormData {
  name: string;
  description: string;
  country: string;
  city: string;
  hostId: string;
  coverImageUrl: string;
  thingsToKnow: { title: string; description: string }[];
  courses: { name: string; dishes: Dish[] }[];
  cameraZoom: number;
  meetingPointLat: number;
  meetingPoint: string;
  phone: string;
  maxGuest: string;
  mealDuration: string;
  meetingPointLong: number;
  isCustomMeal: boolean;
  isActive: boolean;
  kitchenTimes: string[];
  cost: string;
}
