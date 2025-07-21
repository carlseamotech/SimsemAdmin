import useSWR from "swr";
import {
  getHosts,
  getHost,
  updateHost,
  deleteHost,
  updateHostPayment,
  getHostPayment,
} from "@/services/hosts";
import { UpdateHostInfoDTO, UpdateHostPaymentDTO } from "@/dtos";
import { HostPayment } from "@/models/host";
import { useState } from "react";

export const useHosts = (
  name?: string,
  hostId?: string,
  email?: string,
  country?: string
) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const swrKey = ["/hosts", page, limit, name, hostId, email, country];

  const fetcher = () => {
    const filter: {
      where: {
        name?: { $regex: string; $options: string };
        objectId?: string;
        email?: string;
        country?: string;
      };
    } = { where: {} };
    if (name) {
      filter.where.name = { $regex: name, $options: "i" };
    }
    if (hostId) {
      filter.where.objectId = hostId;
    }
    if (email) {
      filter.where.email = email;
    }
    if (country) {
      filter.where.country = country;
    }
    return getHosts(limit, (page - 1) * limit, filter);
  };

  const { data, error, mutate } = useSWR(swrKey, fetcher);

  return {
    hosts: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    updateHost: async (id: string, host: UpdateHostInfoDTO) => {
      await updateHost(id, host);
      mutate();
    },
    deleteHost: async (phone: string) => {
      await deleteHost(phone);
      mutate();
    },
  };
};

export const useHost = (id: string) => {
  const { data: host, error, mutate } = useSWR(`/hosts/${id}`, () =>
    getHost(id)
  );

  const paymentObjectId = host?.payment?.objectId;

  const { data: hostPayment } = useSWR<HostPayment>(
    paymentObjectId ? `/payments/${paymentObjectId}` : null,
    () => getHostPayment(paymentObjectId!)
  );

  return {
    host,
    hostPayment,
    isLoading: !error && !host,
    isError: error,
    mutate,
    updateHost: async (host: UpdateHostInfoDTO) => {
      const updatedHost = await updateHost(id, host);
      mutate();
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
