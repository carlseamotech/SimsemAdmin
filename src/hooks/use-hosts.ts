import useSWR from "swr";
import {
  getHosts,
  getHost,
  updateHost,
  deleteHost,
  updateHostPayment,
  UpdateHostDTO,
  UpdateHostPaymentDTO,
} from "@/services/hosts";

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
  const { data, error, mutate } = useSWR(`/hosts/${id}`, () => getHost(id));
  return {
    host: data,
    isLoading: !error && !data,
    isError: error,
    updateHost: async (host: UpdateHostDTO) => {
      const updatedHost = await updateHost(id, host);
      mutate(updatedHost, false);
      return updatedHost;
    },
    updateHostPayment: async (paymentId: string, payment: UpdateHostPaymentDTO) => {
      const updatedPayment = await updateHostPayment(paymentId, payment);
      // Assuming the host object has a payment property that needs to be updated
      mutate((data) => (data ? { ...data, payment: updatedPayment } : data), false);
      return updatedPayment;
    },
  };
};
