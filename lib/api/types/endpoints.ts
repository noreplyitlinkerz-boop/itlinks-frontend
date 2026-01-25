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
  brandID: string | { _id: string; name: string };
  description: string;
  price: number;
  stock: number;
  featured: boolean;
  isVisible: boolean;
  isVerified: boolean;
  rating: number;
  discount?:
    | string
    | {
        percentage: number;
        discountedPrice: number;
      };
  specifications?: string | Record<string, string>;
  product_primary_image_url?: string;
  product_videos_url?: string[];
  images?: string[];
  keywords?: string[];
  createdAt?: string;
  updatedAt?: string;
  categoryID: string | Category;
  __v?: number;
}

export interface CreateProductRequest {
  slug: string;
  name: string;
  brandID: string;
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
  categoryID: string;
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
  search: string;
  limit?: number;
  [key: string]: unknown;
}

export interface SearchProductsResponse {
  success: boolean;
  data: {
    _id: string;
    slug: string;
    name: string;
    price: number;
  }[];
  count: number;
}

export interface Category {
  _id: string;
  name: string;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export type PaymentMethod =
  | "cash_on_delivery"
  | "credit_card"
  | "debit_card"
  | "upi"
  | "net_banking"
  | "wallet"
  | "razorpay";

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
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  items: Array<{
    product: Product | null;
    quantity: number;
    price: number;
    discount?: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  totalAmount: number;
  subtotal?: number;
  shippingCost?: number;
  taxAmount?: number;
  discount?: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  paymentTransactionId?: string;
  cancelReason?: string;
  razorpayOrderId?: string;
  paymentGatewayResponse?: any;
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

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface RazorpayVerifyRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
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
  role: "admin" | "user";
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
// export type SearchProductsResponse = Product[]; // Removed duplicate

// ============================================================================
// Cart Types
// ============================================================================

export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export type GetCartResponse = Cart;

// ============================================================================
// Brand Types
// ============================================================================
export interface Brand {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Banner Types
// ============================================================================
export interface Banner {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  ctaText: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Navigation Types
// ============================================================================
export interface NavigationItem {
  _id: string;
  label: string;
  url: string;
  children: { label: string; url: string }[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
