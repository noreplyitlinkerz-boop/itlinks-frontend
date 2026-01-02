/**
 * Order Service
 * API methods for order operations
 */

import { BaseService } from "./base-service";
import {
  Order,
  CreateOrderRequest,
  GetOrdersParams,
  UpdateOrderStatusRequest,
  UpdatePaymentStatusRequest,
  CancelOrderRequest,
  OrderStats,
  GetOrdersResponse,
  RazorpayOrder,
  RazorpayVerifyRequest,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class OrderService extends BaseService {
  protected basePath = "/orders";

  /**
   * Create new order
   * @authenticated Requires authentication
   * @endpoint POST /orders
   */
  async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return this.post<ApiResponse<Order>>("", data);
  }

  /**
   * Get user orders with pagination and filters
   * @authenticated Requires authentication - Returns only current user's orders
   * @endpoint GET /orders
   */
  async getUserOrders(params?: GetOrdersParams): Promise<GetOrdersResponse> {
    return this.get<GetOrdersResponse>("", params);
  }

  /**
   * Get order by ID
   * @authenticated Requires authentication - User scope only
   * @endpoint GET /orders/{id}
   */
  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return this.get<ApiResponse<Order>>(`/${id}`);
  }

  /**
   * Cancel order
   * @authenticated Requires authentication - User can cancel their own orders
   * @endpoint DELETE /orders/{id}/cancel
   */
  async cancelOrder(
    id: string,
    data: CancelOrderRequest
  ): Promise<ApiResponse<Order>> {
    return this.delete<ApiResponse<Order>>(`/${id}/cancel`, data);
  }

  /**
   * Create Razorpay order for an existing order
   * @authenticated Requires authentication
   * @endpoint POST /orders/{id}/razorpay/create
   */
  async createRazorpayOrder(id: string): Promise<ApiResponse<RazorpayOrder>> {
    return this.post<ApiResponse<RazorpayOrder>>(`/${id}/razorpay/create`);
  }

  /**
   * Verify Razorpay payment
   * @authenticated Requires authentication
   * @endpoint POST /orders/{id}/razorpay/verify
   */
  async verifyRazorpayPayment(
    id: string,
    data: RazorpayVerifyRequest
  ): Promise<ApiResponse<Order>> {
    return this.post<ApiResponse<Order>>(`/${id}/razorpay/verify`, data);
  }

  // ============================================================================
  // Admin Methods
  // ============================================================================

  /**
   * Get all orders from all users
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint GET /orders/admin/all
   */
  async getAllOrders(params?: GetOrdersParams): Promise<GetOrdersResponse> {
    return this.get<GetOrdersResponse>("/admin/all", params);
  }

  /**
   * Get order statistics
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint GET /orders/admin/stats
   */
  async getOrderStats(): Promise<ApiResponse<OrderStats>> {
    return this.get<ApiResponse<OrderStats>>("/admin/stats");
  }

  /**
   * Get order by ID (Admin version)
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint GET /orders/admin/{id}
   * @deprecated Use getOrderById instead - this endpoint doesn't exist in API rules
   */
  async getOrderByIdAdmin(id: string): Promise<ApiResponse<Order>> {
    return this.get<ApiResponse<Order>>(`/admin/${id}`);
  }

  /**
   * Update order status
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint PUT /orders/{id}/status
   */
  async updateOrderStatus(
    id: string,
    data: UpdateOrderStatusRequest
  ): Promise<ApiResponse<Order>> {
    return this.put<ApiResponse<Order>>(`/${id}/status`, data);
  }

  /**
   * Update payment status
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint PUT /orders/{id}/payment
   */
  async updatePaymentStatus(
    id: string,
    data: UpdatePaymentStatusRequest
  ): Promise<ApiResponse<Order>> {
    return this.put<ApiResponse<Order>>(`/${id}/payment`, data);
  }

  /**
   * Cancel order (Admin version)
   * @admin ADMIN ONLY - Requires admin role
   * @endpoint DELETE /orders/admin/{id}/cancel
   * @deprecated Not in API rules - use cancelOrder instead
   */
  async cancelOrderAdmin(
    id: string,
    data: CancelOrderRequest
  ): Promise<ApiResponse<Order>> {
    return this.delete<ApiResponse<Order>>(`/admin/${id}/cancel`, data);
  }
}

// Export singleton instance
export const orderService = new OrderService();
