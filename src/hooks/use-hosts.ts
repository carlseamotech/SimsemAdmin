import useSWR from "swr";
import {
  getHosts,
  getHost,
  updateHost,
  deleteHost,
  updateHostPayment,
  UpdateHostDTO,
  UpdateHostPaymentDTO,
  getHostPayment,
} from "@/services/hosts";
import { HostPayment } from "@/models/host";

export const useHosts = (limit?: number) => {
  const { data, error, mutate } = useSWR(["/hosts", limit], () =>
    getHosts(limit)
  );
  return {
    hosts: data,
    isLoading: !error && !data,
    isError: error,
    updateHost: async (id: string, host: UpdateHostDTO) => {
      const updatedHost = await updateHost(id, host);
      mutate(
        (data) =>
          data?.map((h) => (h.objectId === id ? { ...h, ...updatedHost } : h)),
        false
      );
      return updatedHost;
    },
    deleteHost: async (phone: string) => {
      await deleteHost(phone);
      mutate(
        (data) => data?.filter((h) => h.phone !== phone),
        false
      );
    },
  };
};

export const useHost = (id: string) => {
  const { data: host, error, mutate } = useSWR(`/hosts/${id}`, () =>
    getHost(id)
  );
  const { data: hostPayment } = useSWR<HostPayment>(
    host ? `/payments/${host.payment.objectId}` : null,
    () => getHostPayment(host!.payment.objectId)
  );

  return {
    host,
    hostPayment,
    isLoading: !error && !host,
    isError: error,
    updateHost: async (host: UpdateHostDTO) => {
      const updatedHost = await updateHost(id, host);
      mutate(updatedHost, false);
      return updatedHost;
    },
    updateHostPayment: async (
      paymentId: string,
      payment: UpdateHostPaymentDTO
    ) => {
      const updatedPayment = await updateHostPayment(paymentId, payment);
      mutate();
      return updatedPayment;
    },
    deleteHost: async (phone: string) => {
      await deleteHost(phone);
      mutate(undefined, false);
    },
  };
};
