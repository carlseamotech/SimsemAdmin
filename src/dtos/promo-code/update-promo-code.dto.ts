export interface UpdatePromoCodeDTO {
  code?: string;
  discount?: number;
  discountType?: "amount" | "percentage";
  expiryDate?: {
    __type: "Date";
    iso: string;
  };
  country?: string;
  serviceType?: "tour" | "meal";
  isActive?: boolean;
}
