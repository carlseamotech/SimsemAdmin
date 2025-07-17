export interface Destination {
  objectId: string;
  name: string;
  image: {
    __type: "File";
    name: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DestinationDetails {
  objectId: string;
  destinationId: string;
  about: string;
  gallery: {
    __type: "File";
    name: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface TopCity {
  objectId: string;
  destinationId: string;
  name: string;
  image: {
    __type: "File";
    name: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TopCityDetails {
  objectId: string;
  cityId: string;
  about: string;
  gallery: {
    __type: "File";
    name: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
