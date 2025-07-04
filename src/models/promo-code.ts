export interface PromoCode {
  objectId: string;
  expiryDate: {
    __type: "Date";
    iso: string;
  };
  code: string;
  discount: number;
  discountType: string;
  country: string;
  serviceType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
