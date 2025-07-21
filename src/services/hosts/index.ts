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
  const response = await api.get(BASE_URL, {
    params: {
      limit,
      skip,
      count: 1,
      order: "-createdAt",
      ...filter,
    },
  });
  return response.data;
};

export const getHost = async (id: string): Promise<Host> => {
  const response = await api.get<Host>(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateHost = async (id: string, host: UpdateHostInfoDTO): Promise<Host> => {
  const response = await api.put<Host>(`${BASE_URL}/${id}`, host as any);
  return response.data;
};

export const deleteHost = async (phone: string): Promise<void> => {
  await api.post("/functions/deleteUser", { phone, userType: "service_provider" });
};

export const updateHostPayment = async (id: string, payment: UpdateHostPaymentDTO): Promise<HostPayment> => {
  const response = await api.put<HostPayment>(`${PAYMENT_BASE_URL}/${id}`, payment as any);
  return response.data;
};

export const getHostPayment = async (id: string): Promise<HostPayment> => {
  const response = await api.get<HostPayment>(`${PAYMENT_BASE_URL}/${id}`);
  return response.data;
};

export const approveHost = async (id: string): Promise<Host> => {
  const response = await api.put<Host>(`${BASE_URL}/${id}`, {
    isVerified: true,
  } as any);
  return response.data;
};

export const declineHost = async (id: string): Promise<Host> => {
  const response = await api.put<Host>(`${BASE_URL}/${id}`, {
    isVerified: false,
  } as any);
  return response.data;
};

