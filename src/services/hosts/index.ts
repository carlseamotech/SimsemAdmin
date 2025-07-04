import api from "../api";
import { Host, HostPayment } from "@/models/host";

const BASE_URL = "/classes/ServiceProvider";
const PAYMENT_BASE_URL = "/classes/ServiceProviderPayment";

export type UpdateHostDTO = Partial<Omit<Host, "objectId" | "createdAt" | "updatedAt">>;
export type UpdateHostPaymentDTO = Partial<Omit<HostPayment, "objectId" | "createdAt" | "updatedAt">>;

export const getHosts = async (limit?: number): Promise<Host[]> => {
  const params = limit ? { limit, order: "-createdAt" } : { order: "-createdAt" };
  const response = await api.get<{ results: Host[] }>(BASE_URL, { params });
  return response.results;
};

export const getHost = async (id: string): Promise<Host> => {
  return await api.get<Host>(`${BASE_URL}/${id}`);
};

export const updateHost = async (id: string, host: UpdateHostDTO): Promise<Host> => {
  return await api.put<Host>(`${BASE_URL}/${id}`, host as Record<string, unknown>);
};

export const deleteHost = async (phone: string): Promise<void> => {
  await api.post("/functions/deleteUser", { phone, userType: "service_provider" });
};

export const updateHostPayment = async (id: string, payment: UpdateHostPaymentDTO): Promise<HostPayment> => {
  return await api.put<HostPayment>(`${PAYMENT_BASE_URL}/${id}`, payment as Record<string, unknown>);
};
