import useSWR from "swr";
import {
  getPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} from "@/services/promo-code";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos/promo-code";
import { PromoCode } from "@/models/promo-code";

export const usePromoCodes = () => {
  const { data, error, mutate } = useSWR<PromoCode[]>("/promo-codes", getPromoCodes);

  const createPromoCodeHandler = async (promoCode: CreatePromoCodeDTO) => {
    const newPromoCode = await createPromoCode(promoCode);
    mutate((data) => (data ? [...data, newPromoCode] : [newPromoCode]), false);
    return newPromoCode;
  };

  const updatePromoCodeHandler = async (
    id: string,
    promoCode: UpdatePromoCodeDTO
  ) => {
    const updatedPromoCode = await updatePromoCode(id, promoCode);
    mutate(
      (data) =>
        data?.map((p) =>
          p.objectId === id ? { ...p, ...updatedPromoCode } : p
        ),
      false
    );
    return updatedPromoCode;
  };

  const deletePromoCodeHandler = async (id: string) => {
    await deletePromoCode(id);
    mutate(
      (data) => data?.filter((p) => p.objectId !== id),
      false
    );
  };

  return {
    promoCodes: data,
    isLoading: !error && !data,
    isError: error,
    createPromoCode: createPromoCodeHandler,
    updatePromoCode: updatePromoCodeHandler,
    deletePromoCode: deletePromoCodeHandler,
  };
};