import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeParse<T>(data: any, fallback: T): T {
  if (!data) return fallback;
  if (typeof data === "object") return data as T;
  if (typeof data !== "string") return fallback;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    // Attempt to fix common "dirty" JSON issues from the API
    // 1. Fix unescaped measurement quotes (e.g., "15.6"")
    try {
      const cleaned = data.replace(/(\d+(?:\.\d+)?)"(?=")/g, '$1\\"');
      return JSON.parse(cleaned) as T;
    } catch (secondError) {
      console.error("Failed to parse JSON after cleaning:", data, secondError);
      return fallback;
    }
  }
}
