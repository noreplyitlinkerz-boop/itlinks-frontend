/**
 * API Configuration
 * Centralized configuration for API client
 */

export const API_CONFIG = {
  // Base URL - should be set via environment variable
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",

  // Timeout settings (in milliseconds)
  TIMEOUT: 30000, // 30 seconds

  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  },

  // Request headers
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user",
  },
} as const;

export type ApiConfig = typeof API_CONFIG;
