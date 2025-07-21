"use client";
import { useState } from "react";
import useSWR from "swr";
import { getTours, deleteTour } from "@/services";
import toast from "react-hot-toast";
import { ApiError } from "@/services/types";

export const useTours = (
  types?: string[],
  enabled: boolean = true,
  experienceId?: string,
  hostId?: string,
  country?: string
) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const swrKey = enabled
    ? ["/tours", types?.join(","), page, limit, experienceId, hostId, country]
    : null;

  const fetcher = () => {
    const filter: {
      where: {
        type?: { $in: string[] };
        objectId?: string;
        guideId?: string;
        country?: string;
      };
    } = { where: {} };
    if (types && types.length > 0) {
      filter.where.type = { $in: types };
    }
    if (experienceId) {
      filter.where.objectId = experienceId;
    }
    if (hostId) {
      filter.where.guideId = hostId;
    }
    if (country) {
      filter.where.country = country;
    }
    return getTours(limit, (page - 1) * limit, filter);
  };

  const { data, error, mutate } = useSWR(swrKey, fetcher);

  const deleteTourHandler = async (id: string) => {
    try {
      await deleteTour(id);
      mutate();
      toast.success("Experience deleted successfully");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Failed to delete experience");
    }
  };

  return {
    tours: data?.results || [],
    count: data?.count || 0,
    isLoading: !error && !data,
    isError: error,
    page,
    limit,
    setPage,
    setLimit,
    deleteTour: deleteTourHandler,
    mutate,
  };
};
