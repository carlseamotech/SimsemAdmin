export type LanguageLevel = "Beginner" | "Intermediate" | "Advance" | "Native";

export interface Host {
  objectId: string;
  country: string;
  city: string;
  idBackFile: {
    __type: "File";
    name: string;
    url: string;
  };
  thirdLanguageLevel: LanguageLevel;
  about: string;
  secondLanguage: string;
  thirdLanguage: string;
  idFrontFile: {
    __type: "File";
    name: string;
    url: string;
  };
  isSocialAuth: boolean;
  idBackFileUrl: string;
  secondLanguageLevel: LanguageLevel;
  phone: string;
  firstLanguageLevel: LanguageLevel;
  imageFile: {
    __type: "File";
    name: string;
    url: string;
  };
  isLocalSeller: boolean;
  imageUrl: string;
  isFamilyHost: boolean;
  name: string;
  isTourGuide: boolean;
  payment: {
    __type: "Pointer";
    className: string;
    objectId: string;
  };
  idFrontFileUrl: string;
  email: string;
  firstLanguage: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  isNotified: boolean;
  hasProposedTour: boolean;
  hasProposedMeal: boolean;
  hasProposedShop: boolean;
  rating: number;
  isActive: boolean;
  hourlyRate: number;
  toursCompleted: number;
  foodServed: number;
  isEmailVerified: boolean;
  isContactCreated: boolean;
  createdAt: string;
  updatedAt: string;
  lastActive: {
    __type: "Date";
    iso: string;
  };
}

export interface HostPayment {
  objectId: string;
  type: string;
  fullName: string;
  address: string;
  bankName: string;
  iban: string;
  swiftOrBic: string;
  bankAddress: string;
  createdAt: string;
  updatedAt: string;
}
