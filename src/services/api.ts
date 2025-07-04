import { SimsemApi } from "@/services/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const APP_ID = process.env.NEXT_PUBLIC_PARSE_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_PARSE_API_KEY;

if (!BASE_URL || !APP_ID || !API_KEY) {
  throw new Error("Missing Parse API credentials in environment variables");
}

const api: SimsemApi = {
  get: async <T>(endpoint: string, params?: Record<string, unknown>): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  post: async <T>(endpoint: string, data: Record<string, unknown>): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  put: async <T>(endpoint: string, data: Record<string, unknown>): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

export default api;
