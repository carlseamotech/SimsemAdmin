export interface Host {
  objectId: string;
  city: string;
  about: string;
  firstLanguage: string;
  firstLanguageLevel: string;
  secondLanguage: string;
  secondLanguageLevel: string;
  thirdLanguage: string;
  thirdLanguageLevel: string;
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
