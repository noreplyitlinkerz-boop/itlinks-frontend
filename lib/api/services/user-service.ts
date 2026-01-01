/**
 * User Service
 * API methods for user profile and wishlist operations
 */

import { BaseService } from "./base-service";
import {
  User,
  UpdateProfileRequest,
  Wishlist,
  AddToWishlistRequest,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class UserService extends BaseService {
  protected basePath = "/users";

  /**
   * Update user profile
   * @authenticated Requires authentication
   * @endpoint PATCH /users/profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    return this.patch<ApiResponse<User>>("/profile", data);
  }

  // ============================================================================
  // Wishlist Methods
  // ============================================================================

  /**
   * Get user's wishlist
   * @authenticated Requires authentication
   * @endpoint GET /wishlist
   */
  async getWishlist(): Promise<ApiResponse<Wishlist>> {
    return this.get<ApiResponse<Wishlist>>("/wishlist", undefined, {
      baseURL: "", // Use root path
    });
  }

  /**
   * Add product to wishlist
   * @authenticated Requires authentication
   * @endpoint POST /wishlist
   */
  async addToWishlist(
    data: AddToWishlistRequest
  ): Promise<ApiResponse<Wishlist>> {
    return this.post<ApiResponse<Wishlist>>("/wishlist", data, {
      baseURL: "", // Use root path
    });
  }

  /**
   * Remove product from wishlist
   * @authenticated Requires authentication
   * @endpoint DELETE /wishlist/{productId}
   */
  async removeFromWishlist(productId: string): Promise<ApiResponse<Wishlist>> {
    return this.delete<ApiResponse<Wishlist>>(
      `/wishlist/${productId}`,
      undefined,
      {
        baseURL: "", // Use root path
      }
    );
  }

  /**
   * Clear entire wishlist
   * @authenticated Requires authentication
   * @endpoint DELETE /wishlist
   */
  async clearWishlist(): Promise<ApiResponse<{ message: string }>> {
    return this.delete<ApiResponse<{ message: string }>>(
      "/wishlist",
      undefined,
      {
        baseURL: "", // Use root path
      }
    );
  }
}

// Export singleton instance
export const userService = new UserService();
