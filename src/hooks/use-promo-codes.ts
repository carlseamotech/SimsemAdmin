import useSWR from "swr";
import {
  getPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} from "@/services/promo-code";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos/promo-code";
import toast from "react-hot-toast";
import { ApiError } from "@/services/types";
import { useState } from "react";

export const usePromoCodes = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/promo-codes", page, limit],
    () => getPromoCodes(limit, (page - 1) * limit)
  );

  const createPromoCodeHandler = async (promoCode: CreatePromoCodeDTO) => {
    try {
      const newPromoCode = await createPromoCode(promoCode);
      mutate();
      toast.success("Promotion created successfully");
      return newPromoCode;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to create promotion"
      );
    }
  };

  const updatePromoCodeHandler = async (
    id: string,
    promoCode: UpdatePromoCodeDTO
  ) => {
    try {
      await updatePromoCode(id, promoCode);
      mutate();
      toast.success("Promotion updated successfully");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to update promotion"
      );
    }
  };

  const deletePromoCodeHandler = async (id: string) => {
    try {
      await deletePromoCode(id);
      mutate();
      toast.success("Promotion deleted successfully");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "Failed to delete promotion"
      );
    }
  };

  return {
    promoCodes: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    createPromoCode: createPromoCodeHandler,
    updatePromoCode: updatePromoCodeHandler,
    deletePromoCode: deletePromoCodeHandler,
  };
};