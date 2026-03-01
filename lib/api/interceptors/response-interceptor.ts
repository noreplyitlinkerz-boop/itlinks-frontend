/**
 * Response Interceptor
 * Handles successful responses and errors with retry logic
 */

import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { handleApiError, logError } from "../errors/error-handler";
import { shouldRetry, getRetryDelay } from "./retry-logic";

/**
 * Response interceptor for successful responses
 */
export function responseInterceptor(response: AxiosResponse): AxiosResponse {
  // Log response in development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      {
        status: response.status,
        data: response.data,
      }
    );
  }

  return response;
}

/**
 * Response error interceptor with retry logic
 */
export async function responseErrorInterceptor(
  error: AxiosError
): Promise<never> {
  const config = error.config as InternalAxiosRequestConfig & {
    _retry?: number;
  };

  // Log error
  logError(error);

  // Check if we should retry
  if (config && shouldRetry(error, config._retry || 0)) {
    config._retry = (config._retry || 0) + 1;

    const delay = getRetryDelay(config._retry);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Retry] Attempt ${config._retry} after ${delay}ms for ${config.url}`
      );
    }

    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry the request
    const axios = (await import("../api-client")).apiClient;
    return axios.request(config);
  }

  // Handle and throw custom error
  handleApiError(error);
}
