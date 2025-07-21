import apiClient from "./api";

export const uploadFile = async (file: File): Promise<{ url: string; name: string }> => {
  const response = await api.post(
    `/files/${file.name}`,
    file
  );
  return response.data;
};

