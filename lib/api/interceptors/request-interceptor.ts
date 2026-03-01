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
  // No manual token injection - browser handles session cookies automatically via withCredentials: true

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
