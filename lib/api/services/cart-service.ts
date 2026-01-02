import { BaseService } from "./base-service";
import {
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  GetCartResponse,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class CartService extends BaseService {
  protected basePath = "/cart";

  /**
   * Get user's cart
   */
  async getCart(): Promise<ApiResponse<GetCartResponse>> {
    return this.get<ApiResponse<GetCartResponse>>("");
  }

  /**
   * Add item to cart
   */
  async addToCart(
    productId: string,
    quantity: number = 1
  ): Promise<ApiResponse<Cart>> {
    return this.post<ApiResponse<Cart>>("", {
      productId,
      quantity,
    } as AddToCartRequest);
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(productId: string): Promise<ApiResponse<Cart>> {
    return this.delete<ApiResponse<Cart>>(`/${productId}`);
  }

  /**
   * Update cart item quantity
   */
  async updateQuantity(
    productId: string,
    quantity: number
  ): Promise<ApiResponse<Cart>> {
    return this.put<ApiResponse<Cart>>(`/update/${productId}`, {
      quantity,
    } as UpdateCartItemRequest);
  }

  /**
   * Clear cart
   */
  async clearCart(): Promise<ApiResponse<Cart>> {
    return this.delete<ApiResponse<Cart>>("");
  }
}

export const cartService = new CartService();
