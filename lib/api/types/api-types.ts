/**
 * API Type Definitions
 * Common types used across the API
 */

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error response
 */
export interface ErrorResponse {
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

/**
 * Sort params
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Search params
 */
export interface SearchParams {
  search?: string;
  query?: string;
  [key: string]: unknown;
}

/**
 * Filter params
 */
export type FilterParams = Record<string, unknown>;

/**
 * Request config
 */
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  timeout?: number;
  withCredentials?: boolean;
}
