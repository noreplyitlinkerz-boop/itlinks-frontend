/**
 * Base Service
 * Abstract base class for all API services with common CRUD methods
 */

import { AxiosRequestConfig } from "axios";
import { apiClient } from "../api-client";
import { buildUrl, createFormData } from "../utils/api-utils";

export abstract class BaseService {
  /**
   * Base endpoint path for the service
   */
  protected abstract basePath: string;

  /**
   * GET request
   */
  protected async get<T>(
    path: string = "",
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = buildUrl(`${this.basePath}${path}`, params);
    const response = await apiClient.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request with JSON data
   */
  protected async post<T, D = unknown>(
    path: string = "",
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  }

  /**
   * POST request with FormData (for file uploads)
   */
  protected async postFormData<T>(
    path: string = "",
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = createFormData(data);
    const url = `${this.basePath}${path}`;

    const response = await apiClient.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  /**
   * PUT request with JSON data
   */
  protected async put<T, D = unknown>(
    path: string = "",
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request with FormData (for file uploads)
   */
  protected async putFormData<T>(
    path: string = "",
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const formData = createFormData(data);
    const url = `${this.basePath}${path}`;

    const response = await apiClient.put<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  /**
   * PATCH request
   */
  protected async patch<T, D = unknown>(
    path: string = "",
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  protected async delete<T>(
    path: string = "",
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = `${this.basePath}${path}`;
    const response = await apiClient.delete<T>(url, {
      ...config,
      data,
    });
    return response.data;
  }
}
