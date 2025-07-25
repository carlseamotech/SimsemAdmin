import api from "../api";
import { PromoCode } from "@/models/promo-code";
import { CreatePromoCodeDTO, UpdatePromoCodeDTO } from "@/dtos";
import logger from "@/lib/logger";

const BASE_URL = "/classes/PromoCode";

export const getPromoCodes = async (
  limit: number,
  skip: number
): Promise<{ results: PromoCode[]; count: number }> => {
  logger.debug("Attempting to get promo codes", { limit, skip });
  try {
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
    logger.info("Successfully got promo codes", response);
    return response;
  } catch (error) {
    logger.error("Failed to get promo codes", error);
    throw error;
  }
};

export const getPromoCode = async (id: string): Promise<PromoCode> => {
  logger.debug(`Attempting to get promo code with id: ${id}`);
  try {
    const response = await api.get<PromoCode>(`${BASE_URL}/${id}`);
    logger.info(`Successfully got promo code with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get promo code with id: ${id}`, error);
    throw error;
  }
};

export const createPromoCode = async (
  data: CreatePromoCodeDTO
): Promise<PromoCode> => {
  logger.debug("Attempting to create promo code", data);
  try {
    const response = await api.post<PromoCode>(BASE_URL, data);
    logger.info("Successfully created promo code", response);
    return response;
  } catch (error) {
    logger.error("Failed to create promo code", error);
    throw error;
  }
};

export const updatePromoCode = async (
  id: string,
  data: UpdatePromoCodeDTO
): Promise<PromoCode> => {
  logger.debug(`Attempting to update promo code with id: ${id}`, data);
  try {
    await api.put<PromoCode>(`${BASE_URL}/${id}`, data);
    const response = await getPromoCode(id);
    logger.info(`Successfully updated promo code with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update promo code with id: ${id}`, error);
    throw error;
  }
};

export const deletePromoCode = async (id: string): Promise<void> => {
  logger.debug(`Attempting to delete promo code with id: ${id}`);
  try {
    await api.delete(`${BASE_URL}/${id}`);
    logger.info(`Successfully deleted promo code with id: ${id}`);
  } catch (error) {
    logger.error(`Failed to delete promo code with id: ${id}`, error);
    throw error;
  }
};
