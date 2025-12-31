/**
 * Retry Logic
 * Implements exponential backoff retry strategy
 */

import { AxiosError } from "axios";
import { API_CONFIG } from "../api-config";
import { calculateBackoff, isRetryableError } from "../utils/api-utils";

/**
 * Check if request should be retried
 */
export function shouldRetry(error: AxiosError, retryCount: number): boolean {
  // Don't retry if max retries reached
  if (retryCount >= API_CONFIG.RETRY.MAX_RETRIES) {
    return false;
  }

  // Don't retry if no response and not a network error
  if (
    !error.response &&
    error.code !== "ECONNABORTED" &&
    !error.message.includes("Network Error")
  ) {
    return false;
  }

  // Check if error is retryable based on status code
  const statusCode = error.response?.status;
  if (!isRetryableError(statusCode)) {
    return false;
  }

  // Don't retry non-idempotent methods by default (unless it's a network error)
  const method = error.config?.method?.toUpperCase();
  if (
    !error.response &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(method || "")
  ) {
    // Only retry network errors for GET requests
    return method === "GET";
  }

  return true;
}

/**
 * Calculate retry delay with exponential backoff
 */
export function getRetryDelay(retryCount: number): number {
  return calculateBackoff(retryCount, API_CONFIG.RETRY.RETRY_DELAY);
}
