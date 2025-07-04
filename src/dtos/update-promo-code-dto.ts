export interface UpdatePromoCodeDTO {
  code?: string;
  discount?: number;
  discountType?: "percentage" | "amount";
  expiryDate?: {
    __type: "Date";
    iso: string;
  };
  serviceType?: string;
  isActive?: boolean;
  quantity?: number;
  name?: string;
  description?: string;
}
