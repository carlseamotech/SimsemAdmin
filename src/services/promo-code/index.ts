import api from "../api";
import { PromoCode } from "@/models/promo-code";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos";

const BASE_URL = "/classes/PromoCode";

export const getPromoCodes = async (
  limit: number,
  skip: number
): Promise<{ results: PromoCode[]; count: number }> => {
  const response = await api.get<{ results: PromoCode[]; count: number }>(
    BASE_URL,
    {
      params: {
        limit,
        skip,
        count: 1,
      },
    }
  );
  return response;
};

export const getPromoCode = async (id: string): Promise<PromoCode> => {
  return api.get<PromoCode>(`${BASE_URL}/${id}`);
};

export const createPromoCode = async (
  data: CreatePromoCodeDTO
): Promise<PromoCode> => {
  const response = await api.post<PromoCode>(BASE_URL, data);
  return response;
};

export const updatePromoCode = async (
  id: string,
  data: UpdatePromoCodeDTO
): Promise<PromoCode> => {
  await api.put<PromoCode>(`${BASE_URL}/${id}`, data);
  return getPromoCode(id);
};

export const deletePromoCode = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
