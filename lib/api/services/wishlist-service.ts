import { BaseService } from "./base-service";
import {
  Wishlist,
  AddToWishlistRequest,
  WishlistItem,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class WishlistService extends BaseService {
  protected basePath = "/wishlist";

  /**
   * Get user's wishlist
   */
  async getWishlist(): Promise<ApiResponse<Wishlist>> {
    return this.get<ApiResponse<Wishlist>>("");
  }

  /**
   * Add item to wishlist
   */
  async addToWishlist(productId: string): Promise<ApiResponse<Wishlist>> {
    return this.post<ApiResponse<Wishlist>>("", {
      productId,
    } as AddToWishlistRequest);
  }

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(productId: string): Promise<ApiResponse<Wishlist>> {
    return this.delete<ApiResponse<Wishlist>>(`/${productId}`);
  }

  /**
   * Clear wishlist
   */
  async clearWishlist(): Promise<ApiResponse<{ message: string }>> {
    return this.delete<ApiResponse<{ message: string }>>("");
  }
}

export const wishlistService = new WishlistService();
