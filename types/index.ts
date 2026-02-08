/**
 * Core TypeScript types and interfaces for the Tech Store
 */

import {
  Product as ApiProduct,
  Category as ApiCategory,
  Order as ApiOrder,
  OrderItem as ApiOrderItem,
  OrderStatus as ApiOrderStatus,
  CartItem as ApiCartItem,
} from "@/lib/api/types/endpoints";

export type Product = ApiProduct;
export type Category = ApiCategory;
export type Order = ApiOrder;
export type OrderStatus = ApiOrderStatus;

// These interfaces are kept for backward compatibility if they have specific frontend needs,
// but they should ideally track the API structure.
export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type CartItem = ApiCartItem;

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// The Order type is now an alias for the API Order.
// Mapping frontend fields to API fields:
// id -> _id
// total -> totalAmount
// status -> orderStatus
// customerName -> (derived from user/shippingAddress)
// customerEmail -> (derived from user)

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "newest";
