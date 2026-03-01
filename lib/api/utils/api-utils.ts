/**
 * API Utilities
 * Helper functions for API operations
 */

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Build URL with query parameters
 */
export function buildUrl(
  baseUrl: string,
  params?: Record<string, unknown>
): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  return `${baseUrl}${buildQueryString(params)}`;
}

/**
 * Create FormData from object
 * Handles nested objects and arrays
 */
export function createFormData(
  data: Record<string, unknown> | FormData
): FormData {
  // If data is already FormData, return it directly
  if (data instanceof FormData) {
    return data;
  }

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    // Handle File objects
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Handle FileList
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => {
        formData.append(key, file);
      });
      return;
    }

    // Handle arrays of files
    if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
      value.forEach((file) => {
        formData.append(key, file);
      });
      return;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, String(item));
      });
      return;
    }

    // Handle objects (convert to JSON string)
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Handle primitives
    formData.append(key, String(value));
  });

  return formData;
}

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay
 */
export function calculateBackoff(attempt: number, baseDelay = 1000): number {
  return Math.min(baseDelay * Math.pow(2, attempt), 10000);
}

/**
 * Check if error is retryable
 */
export function isRetryableError(statusCode?: number): boolean {
  if (!statusCode) return true; // Network errors are retryable

  const retryableCodes = [408, 429, 500, 502, 503, 504];
  return retryableCodes.includes(statusCode);
}

/**
 * Extract file extension from filename
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

/**
 * Validate file size (in bytes)
 */
export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const extension = getFileExtension(file.name);
  return allowedTypes.includes(extension);
}
