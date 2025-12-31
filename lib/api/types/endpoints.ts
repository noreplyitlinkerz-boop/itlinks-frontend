/**
 * API Endpoint Type Definitions
 * Request and response types for all API endpoints
 */

import { PaginatedResponse, PaginationParams } from "./api-types";

// ============================================================================
// Product Types
// ============================================================================

export interface Product {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  featured: boolean;
  isVisible: boolean;
  discount?: {
    percentage: number;
    discountedPrice: number;
  };
  specifications?: Record<string, string>;
  product_primary_image?: string;
  images?: string[];
  videos?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  featured: boolean;
  isVisible?: boolean;
  discount?: string; // JSON string
  specifications?: string; // JSON string
  product_primary_image?: File;
  images?: File[];
  videos?: File[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  existingPrimaryImageUrl?: string;
  existingImages?: string; // JSON string array
  existingVideos?: string; // JSON string array
}

export interface GetProductsParams extends PaginationParams {
  featured?: boolean;
  search?: string;
}

export interface SearchProductsParams {
  query: string;
  limit?: number;
  [key: string]: unknown;
}

// ============================================================================
// Order Types
// ============================================================================

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod = "cash_on_delivery" | "card" | "upi";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface OrderItem {
  product: string; // Product ID
  quantity: number;
}

export interface Order {
  _id: string;
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  totalAmount: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  paymentTransactionId?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface GetOrdersParams extends PaginationParams {
  status?: OrderStatus;
}

export interface UpdateOrderStatusRequest {
  orderStatus: OrderStatus;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
}

export interface UpdatePaymentStatusRequest {
  paymentStatus: PaymentStatus;
  paymentTransactionId?: string;
}

export interface CancelOrderRequest {
  cancelReason: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  role: "admin" | "customer";
  address?: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

// ============================================================================
// User/Profile Types
// ============================================================================

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  address?: ShippingAddress;
}

export interface WishlistItem {
  _id: string;
  product: Product;
  addedAt: string;
}

export interface Wishlist {
  items: WishlistItem[];
}

export interface AddToWishlistRequest {
  productId: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export type GetProductsResponse = PaginatedResponse<Product>;
export type GetOrdersResponse = PaginatedResponse<Order>;
export type SearchProductsResponse = Product[];
