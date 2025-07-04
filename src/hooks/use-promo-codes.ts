import useSWR from "swr";
import {
  getPromoCodes,
  createPromoCode,
  updatePromoCode,
  CreatePromoCodeDTO,
  UpdatePromoCodeDTO,
} from "@/services/promo-code";

export const usePromoCodes = () => {
  const { data, error, mutate } = useSWR("/promo-codes", getPromoCodes);
  return {
    promoCodes: data,
    isLoading: !error && !data,
    isError: error,
    createPromoCode: async (promoCode: CreatePromoCodeDTO) => {
      const newPromoCode = await createPromoCode(promoCode);
      mutate((data) => (data ? [...data, newPromoCode] : [newPromoCode]), false);
      return newPromoCode;
    },
    updatePromoCode: async (id: string, promoCode: UpdatePromoCodeDTO) => {
      const updatedPromoCode = await updatePromoCode(id, promoCode);
      mutate(
        (data) =>
          data?.map((p) => (p.objectId === id ? { ...p, ...updatedPromoCode } : p)),
        false
      );
      return updatedPromoCode;
    },
  };
};
