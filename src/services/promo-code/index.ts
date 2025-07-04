import api from '../api';
import { PromoCode } from '@/models/promo-code';
import {
  CreatePromoCodeDTO,
  UpdatePromoCodeDTO,
} from '@/dtos/promo-code';

const BASE_URL = '/classes/PromoCode';

export const getPromoCodes = async (
  where?: Record<string, unknown>
): Promise<PromoCode[]> => {
  const response = await api.get<{ results: PromoCode[] }>(BASE_URL, {
    params: { where },
  });
  return response.results;
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