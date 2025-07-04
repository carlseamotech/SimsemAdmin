import api from "../api";
import { PromoCode } from "@/models/promo-code";

const BASE_URL = "/classes/PromoCode";

export type CreatePromoCodeDTO = Omit<PromoCode, "objectId" | "createdAt" | "updatedAt">;
export type UpdatePromoCodeDTO = Partial<Omit<PromoCode, "objectId" | "createdAt" | "updatedAt">>;

export const getPromoCodes = async (): Promise<PromoCode[]> => {
  const response = await api.get<{ results: PromoCode[] }>(BASE_URL);
  return response.results;
};

export const createPromoCode = async (promoCode: CreatePromoCodeDTO): Promise<PromoCode> => {
  return await api.post<PromoCode>(BASE_URL, promoCode as Record<string, unknown>);
};

export const updatePromoCode = async (id: string, promoCode: UpdatePromoCodeDTO): Promise<PromoCode> => {
  return await api.put<PromoCode>(`${BASE_URL}/${id}`, promoCode as Record<string, unknown>);
};
