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
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";

class OrderService extends BaseService {
  protected basePath = "/orders";

  /**
   * Create new order
   */
  async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return this.post<ApiResponse<Order>>("", data);
  }

  /**
   * Get user orders with pagination and filters
   */
  async getUserOrders(params?: GetOrdersParams): Promise<GetOrdersResponse> {
    return this.get<GetOrdersResponse>("", params);
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return this.get<ApiResponse<Order>>(`/${id}`);
  }

  /**
   * Cancel order
   */
  async cancelOrder(
    id: string,
    data: CancelOrderRequest
  ): Promise<ApiResponse<Order>> {
    return this.delete<ApiResponse<Order>>(`/${id}/cancel`, data);
  }

  // ============================================================================
  // Admin Methods
  // ============================================================================

  /**
   * Get all orders (Admin only)
   */
  async getAllOrders(params?: GetOrdersParams): Promise<GetOrdersResponse> {
    return this.get<GetOrdersResponse>("/admin/all", params);
  }

  /**
   * Get order statistics (Admin only)
   */
  async getOrderStats(): Promise<ApiResponse<OrderStats>> {
    return this.get<ApiResponse<OrderStats>>("/admin/stats");
  }

  /**
   * Get order by ID (Admin only)
   */
  async getOrderByIdAdmin(id: string): Promise<ApiResponse<Order>> {
    return this.get<ApiResponse<Order>>(`/admin/${id}`);
  }

  /**
   * Update order status (Admin only)
   */
  async updateOrderStatus(
    id: string,
    data: UpdateOrderStatusRequest
  ): Promise<ApiResponse<Order>> {
    return this.put<ApiResponse<Order>>(`/${id}/status`, data);
  }

  /**
   * Update payment status (Admin only)
   */
  async updatePaymentStatus(
    id: string,
    data: UpdatePaymentStatusRequest
  ): Promise<ApiResponse<Order>> {
    return this.put<ApiResponse<Order>>(`/${id}/payment`, data);
  }

  /**
   * Cancel order (Admin only)
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
