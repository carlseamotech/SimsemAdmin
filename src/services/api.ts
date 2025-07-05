import { ApiClient, ApiError } from "@/services/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const APP_ID = process.env.NEXT_PUBLIC_PARSE_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_PARSE_API_KEY;

if (!BASE_URL || !APP_ID || !API_KEY) {
  throw new Error("Missing Parse API credentials in environment variables");
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const error: ApiError = {
      status: response.status,
      message: errorData.message || response.statusText,
      data: errorData,
    };
    throw error;
  }
  return response.json();
};

const apiClient: ApiClient = {
  get: async <T>(
    endpoint: string,
    config?: { params?: Record<string, unknown> }
  ): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          url.searchParams.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
      },
    });

    return handleResponse(response);
  },

  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async <T>(endpoint: string, data: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
      },
    });

    return handleResponse(response);
  },
};

export default apiClient;
