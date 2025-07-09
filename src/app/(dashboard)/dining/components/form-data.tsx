import type React from "react";

export interface DishItem {
  id: string;
  name: string;
  description: string;
  image: string;
  mealType: "vegetarian" | "meat" | "vegan";
}

export interface DiningFormData {
  // Basic info (from local living)
  country: string;
  costPerPerson: string;
  minDuration: string;
  maxDuration: string;
  categories: string[];
  description: string;
  coverPhoto: File | null;
  included: string[];
  notIncluded: string[];
  tourName: string;

  // Dining specific
  selectedMainDish: DishItem | null;
  selectedStarter: DishItem | null;
  selectedDessert: DishItem | null;
  customMainDish: string;
  customStarter: string;
  customDessert: string;
}

export interface DiningStepProps {
  formData: DiningFormData;
  setFormData: React.Dispatch<React.SetStateAction<DiningFormData>>;
}
