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
