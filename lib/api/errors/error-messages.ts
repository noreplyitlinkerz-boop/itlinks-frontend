/**
 * Error Messages
 * User-friendly error messages for different error scenarios
 */

export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR:
    "Unable to connect to the server. Please check your internet connection.",
  TIMEOUT: "Request timed out. Please try again.",

  // Authentication errors
  AUTHENTICATION_REQUIRED: "Please log in to continue.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",

  // Authorization errors
  UNAUTHORIZED: "You do not have permission to perform this action.",

  // Validation errors
  VALIDATION_FAILED: "Please check your input and try again.",

  // Resource errors
  NOT_FOUND: "The requested resource was not found.",
  ALREADY_EXISTS: "This resource already exists.",

  // Server errors
  SERVER_ERROR: "Something went wrong on our end. Please try again later.",
  SERVICE_UNAVAILABLE:
    "Service is temporarily unavailable. Please try again later.",

  // Rate limiting
  RATE_LIMIT_EXCEEDED: "Too many requests. Please wait a moment and try again.",

  // Generic errors
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  REQUEST_FAILED: "Request failed. Please try again.",
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
