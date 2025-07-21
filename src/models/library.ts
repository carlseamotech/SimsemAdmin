export interface Dish {
  id: string;
  name: string;
  description: string;
  image: {
    __type: "File";
    name: string;
    url: string;
  };
  mealType: "vegetarian" | "meat" | "vegan";
  ingredients: string;
  type: string;
}

export interface LibraryTour {
  objectId: string;
  name: string;
  description: string;
  country: string;
  feature: string;
  cost: number;
  minDuration: number;
  maxDuration: number;
  timeUnit: string;
  requirements: string[];
}

export interface LibraryMeal {
  objectId: string;
  name: string;
  description: string;
  country: string;
  cost: string;
  dishIds: string[];
}

export interface LibraryDish {
  objectId: string;
  name: string;
  ingredients: string;
  country: string;
  course: string;
  type: string;
  image: {
    __type: "File";
    name: string;
    url: string;
  };
}
