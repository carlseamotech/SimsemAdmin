export interface CreatePromoCodeDTO {
  code: string;
  discount: number;
  discountType: "percentage" | "amount";
  expiryDate: {
    __type: "Date";
    iso: string;
  };
  serviceType: string;
  isActive: boolean;
  country: string;
}
