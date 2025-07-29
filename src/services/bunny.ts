
import logger from "@/lib/logger";

const BUNNY_API_URL = "https://storage.bunnycdn.com/simsem-app";
const BUNNY_ACCESS_KEY = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY!;

export const uploadToBunny = async (file: File): Promise<{ url: string }> => {
  const uploadUrl = `${BUNNY_API_URL}/${file.name}`;
  logger.debug(`Uploading to Bunny: ${uploadUrl}`);

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_ACCESS_KEY,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Bunny API response not ok: ${response.status} ${errorText}`);
    }
    
    logger.info("Successfully uploaded file to Bunny.net", { fileName: file.name });
    
    return { url: `https://simsem.b-cdn.net/${file.name}` };
  } catch (error) {
    logger.error("Failed to upload file to Bunny.net", error);
    throw error;
  }
};
