import api from "../api";
import { PromoCode } from "@/models/promo-code";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos";

const BASE_URL = "/classes/PromoCode";

export const getPromoCodes = async (
  limit: number,
  skip: number
): Promise<{ results: PromoCode[]; count: number }> => {
  const response = await api.get(BASE_URL, {
    params: {
      limit,
      skip,
      count: 1,
    },
  });
  return response.data;
};

export const createPromoCode = async (
  promoCode: CreatePromoCodeDTO
): Promise<PromoCode> => {
  const response = await api.post<PromoCode>(
    BASE_URL,
    promoCode as any
  );
  return response.data;
};

export const updatePromoCode = async (
  id: string,
  promoCode: UpdatePromoCodeDTO
): Promise<PromoCode> => {
  const response = await api.put<PromoCode>(
    `${BASE_URL}/${id}`,
    promoCode as any
  );
  return response.data;
};

export const deletePromoCode = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};