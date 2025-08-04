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
  country?: string,
  status?: string
) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const swrKey = enabled
    ? [
        "/tours",
        types?.join(","),
        page,
        limit,
        experienceId,
        hostId,
        country,
        status,
      ]
    : null;

  const fetcher = () => {
    const filter: {
      where: {
        type?: { $in: string[] };
        objectId?: string;
        guideId?: string;
        country?: string;
        isApproved?: boolean;
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
    if (status && status !== "all") {
      filter.where.isApproved = status === "approved";
    }
    return getTours(limit, (page - 1) * limit, filter);
  };

  const { data, error, mutate } = useSWR(swrKey, fetcher);

  const deleteTourHandler = async (id: string) => {
    try {
      const token = localStorage.getItem("sessionToken");
      if (!token) throw new Error("No session token found");
      await deleteTour(id, token);
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
