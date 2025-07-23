import api from "./api";
import { slugify } from "@/lib/utils";

export const uploadFile = async (
  file: File,
  sessionToken?: string
): Promise<{ url: string; name: string }> => {
  const headers: Record<string, string> = {
    "Content-Type": file.type,
  };

  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }

  const sanitizedFileName = slugify(file.name);
  const response = await api.post<{ url: string; name: string }>(
    `/files/${sanitizedFileName}`,
    file,
    { headers }
  );
  return response;
};