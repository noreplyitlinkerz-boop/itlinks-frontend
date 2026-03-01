/**
 * API Client
 * Configured Axios instance with interceptors
 */

import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "./api-config";
import {
  requestInterceptor,
  requestErrorInterceptor,
} from "./interceptors/request-interceptor";
import {
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors/response-interceptor";

/**
 * Create and configure Axios instance
 */
function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    withCredentials: true, // Include cookies in requests
  });

  // Add request interceptors
  client.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

  // Add response interceptors
  client.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
  );

  return client;
}

/**
 * Singleton API client instance
 */
export const apiClient = createApiClient();

/**
 * Export axios for type usage
 */
export type { AxiosRequestConfig, AxiosResponse } from "axios";
