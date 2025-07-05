import api from "../api";
import { PromoCode } from "@/models/promo-code";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos/promo-code";

const BASE_URL = "/classes/PromoCode";

export const getPromoCodes = async (
  limit: number,
  skip: number
): Promise<{ results: PromoCode[]; count: number }> => {
  return await api.get(BASE_URL, {
    params: {
      limit,
      skip,
      count: 1,
    },
  });
};

export const createPromoCode = async (
  promoCode: CreatePromoCodeDTO
): Promise<PromoCode> => {
  return await api.post<PromoCode>(
    BASE_URL,
    promoCode as unknown as Record<string, unknown>
  );
};

export const updatePromoCode = async (
  id: string,
  promoCode: UpdatePromoCodeDTO
): Promise<PromoCode> => {
  return await api.put<PromoCode>(
    `${BASE_URL}/${id}`,
    promoCode as unknown as Record<string, unknown>
  );
};

export const deletePromoCode = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};