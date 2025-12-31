/**
 * Product Service
 * API methods for product operations
 */

import { BaseService } from "./base-service";
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  GetProductsParams,
  SearchProductsParams,
  GetProductsResponse,
  SearchProductsResponse,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class ProductService extends BaseService {
  protected basePath = "/products";

  /**
   * Get all products with pagination and filters
   */
  async getProducts(params?: GetProductsParams): Promise<GetProductsResponse> {
    return this.get<GetProductsResponse>("", params);
  }

  /**
   * Search products for search bar
   */
  async searchProducts(
    params: SearchProductsParams
  ): Promise<SearchProductsResponse> {
    return this.get<SearchProductsResponse>("/search/list", params);
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.get<ApiResponse<Product>>(`/${id}`);
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
    return this.get<ApiResponse<Product>>(`/slug/${slug}`);
  }

  /**
   * Create new product (Admin only)
   * Uses FormData for file uploads
   */
  async createProduct(
    data: CreateProductRequest
  ): Promise<ApiResponse<Product>> {
    return this.postFormData<ApiResponse<Product>>(
      "",
      data as unknown as Record<string, unknown>
    );
  }

  /**
   * Update product (Admin only)
   * Uses FormData for file uploads
   */
  async updateProduct(
    id: string,
    data: UpdateProductRequest
  ): Promise<ApiResponse<Product>> {
    return this.putFormData<ApiResponse<Product>>(
      `/${id}`,
      data as unknown as Record<string, unknown>
    );
  }

  /**
   * Delete product (Admin only)
   */
  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.delete<ApiResponse<{ message: string }>>(`/${id}`);
  }
}

// Export singleton instance
export const productService = new ProductService();
