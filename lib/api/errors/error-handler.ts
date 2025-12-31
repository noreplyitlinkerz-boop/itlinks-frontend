/**
 * Error Handler
 * Transforms Axios errors into custom error classes with meaningful messages
 */

import { AxiosError } from "axios";
import {
  ApiError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
  TimeoutError,
  ConflictError,
  RateLimitError,
} from "./api-error";
import { ERROR_MESSAGES } from "./error-messages";

interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

/**
 * Handles Axios errors and converts them to custom error classes
 */
export function handleApiError(error: unknown): never {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    const response = error.response;
    const errorData = response?.data as ErrorResponse | undefined;

    // Extract error message
    const message =
      errorData?.message ||
      errorData?.error ||
      error.message ||
      ERROR_MESSAGES.UNKNOWN_ERROR;

    // Network errors (no response)
    if (!response) {
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        throw new TimeoutError(ERROR_MESSAGES.TIMEOUT);
      }
      throw new NetworkError(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Handle specific status codes
    const statusCode = response.status;

    switch (statusCode) {
      case 400:
        // Check if it's a validation error
        if (errorData?.errors) {
          throw new ValidationError(message, errorData.errors);
        }
        throw new ApiError(message, statusCode, "BAD_REQUEST");

      case 401:
        throw new AuthenticationError(message);

      case 403:
        throw new AuthorizationError(message);

      case 404:
        throw new NotFoundError(message);

      case 409:
        throw new ConflictError(message);

      case 422:
        // Unprocessable Entity - often used for validation errors
        if (errorData?.errors) {
          throw new ValidationError(message, errorData.errors);
        }
        throw new ApiError(message, statusCode, "UNPROCESSABLE_ENTITY");

      case 429:
        throw new RateLimitError(message);

      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        throw new ServerError(message);

      default:
        throw new ApiError(message, statusCode);
    }
  }

  // Handle custom errors that are already thrown
  if (error instanceof ApiError) {
    throw error;
  }

  // Handle generic errors
  if (error instanceof Error) {
    throw new ApiError(error.message);
  }

  // Unknown error type
  throw new ApiError(ERROR_MESSAGES.UNKNOWN_ERROR);
}

/**
 * Logs errors in development mode
 */
export function logError(error: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.error("API Error:", error);
  }
}

/**
 * Extracts user-friendly error message from error object
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
}
