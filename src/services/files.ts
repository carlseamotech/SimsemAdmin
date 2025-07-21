import api from "./api";

export const uploadFile = async (
  file: File
): Promise<{ url: string; name: string }> => {
  const response = await api.post<{ url: string; name: string }>(
    `/files/${file.name}`,
    file
  );
  return response;
};

