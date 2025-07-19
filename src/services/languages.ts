import api from "./api";
import { Language } from "@/models/language";

export interface LanguageListResponse {
  results: Language[];
}

export const getLanguages = async (): Promise<LanguageListResponse> => {
  const response = await api.get<LanguageListResponse>("/classes/Language");
  return response;
};
