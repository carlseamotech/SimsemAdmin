export interface PromoCode {
  objectId: string;
  name: string;
  description: string;
  code: string;
  discount: number;
  discountType: "amount" | "percentage";
  expiryDate: {
    __type: "Date";
    iso: string;
  };
  country: string;
  serviceType: "tour" | "meal";
  quantity: number;
  remaining: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}