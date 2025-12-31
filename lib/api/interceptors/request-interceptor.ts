/**
 * Request Interceptor
 * Adds authentication tokens and common headers to requests
 */

import { InternalAxiosRequestConfig } from "axios";
import { TokenStorage } from "../utils/storage";

/**
 * Request interceptor to add auth token and headers
 */
export function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  // Add authentication token if available
  const token = TokenStorage.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Log request in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });
  }

  return config;
}

/**
 * Request error interceptor
 */
export function requestErrorInterceptor(error: unknown): Promise<never> {
  if (process.env.NODE_ENV === "development") {
    console.error("[API Request Error]", error);
  }
  return Promise.reject(error);
}
