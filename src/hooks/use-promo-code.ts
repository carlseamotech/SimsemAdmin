"use client";
import { getPromoCode } from "@/services";
import useSWR from "swr";

export const usePromoCode = (id: string) => {
  const { data, error, isLoading } = useSWR(`/promo-codes/${id}`, () =>
    getPromoCode(id)
  );

  return {
    promoCode: data,
    isLoading,
    isError: error,
  };
};
