import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string): string => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = text.split(".").pop();
  const fileName = text
    .substring(0, text.lastIndexOf("."))
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${fileName}-${timestamp}${randomString}.${fileExtension}`;
};
