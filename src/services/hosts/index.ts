import api from "../api";
import { Host, HostPayment } from "@/models/host";
import { UpdateHostInfoDTO, UpdateHostPaymentDTO } from "@/dtos";
import logger from "@/lib/logger";

const BASE_URL = "/classes/ServiceProvider";
const PAYMENT_BASE_URL = "/classes/ServiceProviderPayment";

export const getHosts = async (
  limit: number,
  skip: number,
  filter?: { where: Record<string, unknown> }
): Promise<{ results: Host[]; count: number }> => {
  logger.debug("Attempting to get hosts", { limit, skip, filter });
  try {
    const response = await api.get(BASE_URL, {
      params: {
        limit,
        skip,
        count: 1,
        order: "-createdAt",
        ...filter,
      },
    });
    logger.info("Successfully got hosts", response);
    return response;
  } catch (error) {
    logger.error("Failed to get hosts", error);
    throw error;
  }
};

export const getHost = async (id: string): Promise<Host> => {
  logger.debug(`Attempting to get host with id: ${id}`);
  try {
    const response = await api.get<Host>(`${BASE_URL}/${id}`);
    logger.info(`Successfully got host with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get host with id: ${id}`, error);
    throw error;
  }
};

export const updateHost = async (
  id: string,
  host: UpdateHostInfoDTO
): Promise<Host> => {
  logger.debug(`Attempting to update host with id: ${id}`, host);
  try {
    await api.put(`${BASE_URL}/${id}`, host);
    const response = await getHost(id);
    logger.info(`Successfully updated host with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update host with id: ${id}`, error);
    throw error;
  }
};

export const deleteHost = async (phone: string): Promise<void> => {
  logger.debug(`Attempting to delete host with phone: ${phone}`);
  try {
    await api.post("/functions/deleteUser", {
      phone,
      userType: "service_provider",
    });
    logger.info(`Successfully deleted host with phone: ${phone}`);
  } catch (error) {
    logger.error(`Failed to delete host with phone: ${phone}`, error);
    throw error;
  }
};

export const updateHostPayment = async (
  id: string,
  payment: UpdateHostPaymentDTO
): Promise<HostPayment> => {
  logger.debug(`Attempting to update host payment with id: ${id}`, payment);
  try {
    await api.put(`${PAYMENT_BASE_URL}/${id}`, payment);
    const response = await getHostPayment(id);
    logger.info(`Successfully updated host payment with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to update host payment with id: ${id}`, error);
    throw error;
  }
};

export const getHostPayment = async (id: string): Promise<HostPayment> => {
  logger.debug(`Attempting to get host payment with id: ${id}`);
  try {
    const response = await api.get<HostPayment>(`${PAYMENT_BASE_URL}/${id}`);
    logger.info(`Successfully got host payment with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to get host payment with id: ${id}`, error);
    throw error;
  }
};

export const approveHost = async (id: string): Promise<Host> => {
  logger.debug(`Attempting to approve host with id: ${id}`);
  try {
    await api.put(`${BASE_URL}/${id}`, {
      isVerified: true,
    });
    const response = await getHost(id);
    logger.info(`Successfully approved host with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to approve host with id: ${id}`, error);
    throw error;
  }
};

export const declineHost = async (id: string): Promise<Host> => {
  logger.debug(`Attempting to decline host with id: ${id}`);
  try {
    await api.put(`${BASE_URL}/${id}`, {
      isVerified: false,
    });
    const response = await getHost(id);
    logger.info(`Successfully declined host with id: ${id}`, response);
    return response;
  } catch (error) {
    logger.error(`Failed to decline host with id: ${id}`, error);
    throw error;
  }
};


