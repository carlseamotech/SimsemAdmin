import api from "./api";
import { slugify } from "@/lib/utils";
import logger from "@/lib/logger";

export const uploadFile = async (
  file: File,
  sessionToken?: string
): Promise<{ url: string; name: string }> => {
  logger.debug("Attempting to upload file", file.name);
  const headers: Record<string, string> = {
    "Content-Type": file.type,
  };

  if (sessionToken) {
    headers["X-Parse-Session-Token"] = sessionToken;
  }

  const sanitizedFileName = slugify(file.name);
  try {
    const response = await api.post<{ url: string; name: string }>(
      `/files/${sanitizedFileName}`,
      file,
      { headers }
    );
    logger.info("Successfully uploaded file", response);
    return response;
  } catch (error) {
    logger.error("Failed to upload file", error);
    throw error;
  }
};