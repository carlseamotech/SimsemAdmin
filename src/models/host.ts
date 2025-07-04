export type LanguageLevel = "Beginner" | "Intermediate" | "Advance" | "Native";

export interface Host {
  objectId: string;
  city: string;
  about: string;
  firstLanguage: string;
  firstLanguageLevel: LanguageLevel;
  secondLanguage: string;
  secondLanguageLevel: LanguageLevel;
  thirdLanguage: string;
  thirdLanguageLevel: LanguageLevel;
  imageUrl: string;
  imageFile: {
    __type: "File";
    name: string;
    url: string;
  };
  country: string;
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
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
