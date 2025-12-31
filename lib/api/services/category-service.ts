/**
 * Category Service
 * API methods for category operations
 */

import { BaseService } from "./base-service";
import { Category } from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class CategoryService extends BaseService {
  protected basePath = "/api/categories";

  /**
   * Get all categories
   */
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.get<ApiResponse<Category[]>>("");
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<ApiResponse<Category>> {
    return this.get<ApiResponse<Category>>(`/${id}`);
  }
}

// Export singleton instance
export const categoryService = new CategoryService();
