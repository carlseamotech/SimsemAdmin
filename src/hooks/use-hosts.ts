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
import { useState } from "react";

export const useHosts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, mutate } = useSWR(
    ["/hosts", page, limit],
    () => getHosts(limit, (page - 1) * limit)
  );

  return {
    hosts: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    updateHost: async (id: string, host: UpdateHostDTO) => {
      await updateHost(id, host);
      mutate();
    },
    deleteHost: async (phone: string) => {
      await deleteHost(phone);
      mutate();
    },
  };
};

// export const useHost = (id: string) => {
//   const { data: host, error, mutate } = useSWR(`/hosts/${id}`, () =>
//     getHost(id)
//   );
//   const { data: hostPayment } = useSWR<HostPayment>(
//     host ? `/payments/${host.payment.objectId}` : null,
//     () => getHostPayment(host!.payment.objectId)
//   );

//   return {
//     host,
//     hostPayment,
//     isLoading: !error && !host,
//     isError: error,
//     updateHost: async (host: UpdateHostDTO) => {
//       const updatedHost = await updateHost(id, host);
//       mutate(updatedHost, false);
//       return updatedHost;
//     },
//     updateHostPayment: async (
//       paymentId: string,
//       payment: UpdateHostPaymentDTO
//     ) => {
//       const updatedPayment = await updateHostPayment(paymentId, payment);
//       mutate();
//       return updatedPayment;
//     },
//     deleteHost: async (phone: string) => {
//       await deleteHost(phone);
//       mutate(undefined, false);
//     },
//   };
// };
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
