import api from "../api";
import { Host, HostPayment } from "@/models/host";
import { UpdateHostInfoDTO, UpdateHostPaymentDTO } from "@/dtos";

const BASE_URL = "/classes/ServiceProvider";
const PAYMENT_BASE_URL = "/classes/ServiceProviderPayment";

export const getHosts = async (
  limit: number,
  skip: number,
  filter?: { where: Record<string, unknown> }
): Promise<{ results: Host[]; count: number }> => {
  return api.get(BASE_URL, {
    params: {
      limit,
      skip,
      count: 1,
      order: "-createdAt",
      ...filter,
    },
  });
};

export const getHost = async (id: string): Promise<Host> => {
  return api.get<Host>(`${BASE_URL}/${id}`);
};

export const updateHost = async (
  id: string,
  host: UpdateHostInfoDTO
): Promise<Host> => {
  await api.put(`${BASE_URL}/${id}`, host);
  return getHost(id);
};

export const deleteHost = async (phone: string): Promise<void> => {
  await api.post("/functions/deleteUser", {
    phone,
    userType: "service_provider",
  });
};

export const updateHostPayment = async (
  id: string,
  payment: UpdateHostPaymentDTO
): Promise<HostPayment> => {
  await api.put(`${PAYMENT_BASE_URL}/${id}`, payment);
  return getHostPayment(id);
};

export const getHostPayment = async (id: string): Promise<HostPayment> => {
  return api.get<HostPayment>(`${PAYMENT_BASE_URL}/${id}`);
};

export const approveHost = async (id: string): Promise<Host> => {
  await api.put(`${BASE_URL}/${id}`, {
    isVerified: true,
  });
  return getHost(id);
};

export const declineHost = async (id: string): Promise<Host> => {
  await api.put(`${BASE_URL}/${id}`, {
    isVerified: false,
  });
  return getHost(id);
};


