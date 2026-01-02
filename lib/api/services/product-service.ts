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
   * @public
   * @endpoint GET /products
   */
  async getProducts(params?: GetProductsParams): Promise<GetProductsResponse> {
    const response = await this.get<any>("", params);

    // Handle flat response structure where pagination is missing
    if (!response.pagination && typeof response.total !== "undefined") {
      const limit = Number(response.limit) || 10;
      const total = Number(response.total) || 0;

      return {
        data: response.data || [],
        pagination: {
          page: Number(response.page) || 1,
          limit,
          total,
          totalPages: Math.ceil(total / limit) || 1,
        },
      };
    }

    return response as GetProductsResponse;
  }

  /**
   * Search products for search bar
   * @public
   * @endpoint GET /products/search/list
   */
  async searchProducts(
    params: SearchProductsParams
  ): Promise<SearchProductsResponse> {
    return this.get<SearchProductsResponse>("/search/list", params);
  }

  /**
   * Get product by ID
   * @public
   * @endpoint GET /products/{id}
   */
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.get<ApiResponse<Product>>(`/${id}`);
  }

  /**
   * Get product by slug
   * @public
   * @endpoint GET /products/slug/{slug}
   */
  async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
    const response = await this.get<any>(`/slug/${slug}`);
    // Support flat response directly
    if (response && response._id && !response.data) {
      return { data: response as Product, success: true };
    }
    return response as ApiResponse<Product>;
  }

  /**
   * Create new product
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint POST /products
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
   * Update product
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint PUT /products/{id}
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
   * Delete product
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint DELETE /products/{id}
   */
  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.delete<ApiResponse<{ message: string }>>(`/${id}`);
  }
}

// Export singleton instance
export const productService = new ProductService();
