/**
 * API Roles and Access Control Types
 * Type definitions and constants for role-based access control
 */

// ============================================================================
// Role Enums
// ============================================================================

/**
 * User roles in the system
 */
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

/**
 * API access levels
 */
export enum ApiAccessLevel {
  PUBLIC = "public", // No authentication required
  AUTHENTICATED = "authenticated", // Requires valid token
  ADMIN = "admin", // Requires admin role
}

// ============================================================================
// Endpoint Classification
// ============================================================================

/**
 * Frontend/User accessible endpoints (Non-Admin)
 */
export const USER_ENDPOINTS = {
  // Products (Read-only)
  PRODUCTS_LIST: "GET /products",
  PRODUCTS_SEARCH: "GET /products/search/list",
  PRODUCTS_BY_ID: "GET /products/:id",
  PRODUCTS_BY_SLUG: "GET /products/slug/:slug",

  // Authentication
  AUTH_SIGNUP: "POST /api/auth/signup",
  AUTH_LOGIN: "POST /api/auth/login",
  AUTH_LOGOUT: "POST /api/auth/logout",
  AUTH_ME: "GET /api/auth/me",

  // User Profile
  USER_UPDATE_PROFILE: "PATCH /users/profile",

  // Wishlist
  WISHLIST_GET: "GET /wishlist",
  WISHLIST_ADD: "POST /wishlist",
  WISHLIST_REMOVE: "DELETE /wishlist/:productId",
  WISHLIST_CLEAR: "DELETE /wishlist",

  // Orders (User scope)
  ORDERS_CREATE: "POST /orders",
  ORDERS_GET_USER: "GET /orders",
  ORDERS_GET_BY_ID: "GET /orders/:id",
  ORDERS_CANCEL: "DELETE /orders/:id/cancel",
} as const;

/**
 * Admin-only endpoints
 */
export const ADMIN_ENDPOINTS = {
  // Products (Write operations)
  PRODUCTS_CREATE: "POST /products",
  PRODUCTS_UPDATE: "PUT /products/:id",
  PRODUCTS_DELETE: "DELETE /products/:id",

  // Orders (Admin operations)
  ORDERS_GET_ALL: "GET /orders/admin/all",
  ORDERS_GET_STATS: "GET /orders/admin/stats",
  ORDERS_UPDATE_STATUS: "PUT /orders/:id/status",
  ORDERS_UPDATE_PAYMENT: "PUT /orders/:id/payment",
} as const;

/**
 * Public endpoints (no authentication required)
 */
export const PUBLIC_ENDPOINTS = [
  USER_ENDPOINTS.AUTH_SIGNUP,
  USER_ENDPOINTS.AUTH_LOGIN,
  USER_ENDPOINTS.PRODUCTS_LIST,
  USER_ENDPOINTS.PRODUCTS_SEARCH,
  USER_ENDPOINTS.PRODUCTS_BY_ID,
  USER_ENDPOINTS.PRODUCTS_BY_SLUG,
] as const;

/**
 * Authenticated endpoints (requires valid token, any role)
 */
export const AUTHENTICATED_ENDPOINTS = [
  USER_ENDPOINTS.AUTH_LOGOUT,
  USER_ENDPOINTS.AUTH_ME,
  USER_ENDPOINTS.USER_UPDATE_PROFILE,
  USER_ENDPOINTS.WISHLIST_GET,
  USER_ENDPOINTS.WISHLIST_ADD,
  USER_ENDPOINTS.WISHLIST_REMOVE,
  USER_ENDPOINTS.WISHLIST_CLEAR,
  USER_ENDPOINTS.ORDERS_CREATE,
  USER_ENDPOINTS.ORDERS_GET_USER,
  USER_ENDPOINTS.ORDERS_GET_BY_ID,
  USER_ENDPOINTS.ORDERS_CANCEL,
] as const;

/**
 * All admin endpoints (requires admin role)
 */
export const ADMIN_ONLY_ENDPOINTS = Object.values(ADMIN_ENDPOINTS);

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if a role is admin
 */
export function isAdminRole(
  role: string | undefined | null
): role is UserRole.ADMIN {
  return role === UserRole.ADMIN;
}

/**
 * Check if a role is user
 */
export function isUserRole(
  role: string | undefined | null
): role is UserRole.USER {
  return role === UserRole.USER;
}

/**
 * Check if an endpoint is public
 */
export function isPublicEndpoint(endpoint: string): boolean {
  return PUBLIC_ENDPOINTS.some((publicEndpoint) =>
    matchEndpoint(endpoint, publicEndpoint)
  );
}

/**
 * Check if an endpoint requires admin access
 */
export function isAdminEndpoint(endpoint: string): boolean {
  return ADMIN_ONLY_ENDPOINTS.some((adminEndpoint) =>
    matchEndpoint(endpoint, adminEndpoint)
  );
}

/**
 * Check if an endpoint requires authentication
 */
export function isAuthenticatedEndpoint(endpoint: string): boolean {
  return AUTHENTICATED_ENDPOINTS.some((authEndpoint) =>
    matchEndpoint(endpoint, authEndpoint)
  );
}

/**
 * Match endpoint pattern (handles dynamic segments like :id)
 */
function matchEndpoint(actual: string, pattern: string): boolean {
  // Extract method and path
  const [patternMethod, patternPath] = pattern.split(" ");
  const actualParts = actual.split(" ");

  if (actualParts.length !== 2) {
    return false;
  }

  const [actualMethod, actualPath] = actualParts;

  // Method must match exactly
  if (patternMethod !== actualMethod) {
    return false;
  }

  // Convert pattern to regex (replace :param with [^/]+)
  const regexPattern = patternPath.replace(/:[^/]+/g, "[^/]+");
  const regex = new RegExp(`^${regexPattern}$`);

  return regex.test(actualPath);
}

// ============================================================================
// Access Level Mapping
// ============================================================================

/**
 * Get the required access level for an endpoint
 */
export function getEndpointAccessLevel(endpoint: string): ApiAccessLevel {
  if (isPublicEndpoint(endpoint)) {
    return ApiAccessLevel.PUBLIC;
  }
  if (isAdminEndpoint(endpoint)) {
    return ApiAccessLevel.ADMIN;
  }
  if (isAuthenticatedEndpoint(endpoint)) {
    return ApiAccessLevel.AUTHENTICATED;
  }
  // Default to authenticated for safety
  return ApiAccessLevel.AUTHENTICATED;
}

// ============================================================================
// Type Exports
// ============================================================================

export type UserEndpoint = (typeof USER_ENDPOINTS)[keyof typeof USER_ENDPOINTS];
export type AdminEndpoint =
  (typeof ADMIN_ENDPOINTS)[keyof typeof ADMIN_ENDPOINTS];
export type PublicEndpoint = (typeof PUBLIC_ENDPOINTS)[number];
export type AuthenticatedEndpoint = (typeof AUTHENTICATED_ENDPOINTS)[number];
