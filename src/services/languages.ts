import api from "./api";
import { Language } from "@/models/language";

export const getLanguages = async (): Promise<{ results: Language[] }> => {
  const response = await api.get("/classes/Language");
  return response.data;
};

