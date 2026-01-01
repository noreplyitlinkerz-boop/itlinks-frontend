/**
 * Authentication Middleware
 * Middleware functions for role-based access control
 */

import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { requireAdmin, requireAuth, hasAccess } from "../utils/role-utils";
import { ApiAccessLevel, getEndpointAccessLevel } from "../types/api-roles";

// ============================================================================
// Request Config Extension
// ============================================================================

/**
 * Extended Axios config with access control options
 */
export interface AuthRequestConfig extends AxiosRequestConfig {
  /**
   * Skip access control checks (use with caution)
   */
  skipAccessControl?: boolean;

  /**
   * Required access level for this request
   */
  requiredAccessLevel?: ApiAccessLevel;
}

// ============================================================================
// Middleware Functions
// ============================================================================

/**
 * Middleware to require admin access
 * Add this to request config for admin-only endpoints
 */
export function withAdminAuth(
  config: AxiosRequestConfig = {}
): AuthRequestConfig {
  return {
    ...config,
    requiredAccessLevel: ApiAccessLevel.ADMIN,
  };
}

/**
 * Middleware to require authentication
 * Add this to request config for authenticated endpoints
 */
export function withAuth(config: AxiosRequestConfig = {}): AuthRequestConfig {
  return {
    ...config,
    requiredAccessLevel: ApiAccessLevel.AUTHENTICATED,
  };
}

/**
 * Request interceptor for access control
 * Validates user has required permissions before sending request
 */
export function accessControlInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const authConfig = config as InternalAxiosRequestConfig & AuthRequestConfig;

  // Skip if explicitly disabled
  if (authConfig.skipAccessControl) {
    return config;
  }

  // Build endpoint string for validation
  const method = config.method?.toUpperCase() || "GET";
  const path = config.url || "";
  const endpoint = `${method} ${path}`;

  // Check if user has access
  if (!hasAccess(endpoint)) {
    const accessLevel = getEndpointAccessLevel(endpoint);

    if (accessLevel === ApiAccessLevel.ADMIN) {
      throw new Error(
        `Admin access required for ${endpoint}. Please login as admin.`
      );
    }

    if (accessLevel === ApiAccessLevel.AUTHENTICATED) {
      throw new Error(`Authentication required for ${endpoint}. Please login.`);
    }
  }

  return config;
}

// ============================================================================
// Guard Functions (for use in services)
// ============================================================================

/**
 * Guard function to ensure admin access
 * Call this at the start of admin-only service methods
 * @throws Error if user is not admin
 */
export function guardAdmin(): void {
  requireAdmin();
}

/**
 * Guard function to ensure authentication
 * Call this at the start of authenticated service methods
 * @throws Error if user is not authenticated
 */
export function guardAuth(): void {
  requireAuth();
}

/**
 * Guard function for specific endpoint
 * @param endpoint - Endpoint in format "METHOD /path"
 * @throws Error if user doesn't have access
 */
export function guardEndpoint(endpoint: string): void {
  if (!hasAccess(endpoint)) {
    const accessLevel = getEndpointAccessLevel(endpoint);
    throw new Error(
      `Access denied for ${endpoint}. Required level: ${accessLevel}`
    );
  }
}

// ============================================================================
// Development Helpers
// ============================================================================

/**
 * Log access control information for debugging
 */
export function logAccessControl(endpoint: string): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const accessLevel = getEndpointAccessLevel(endpoint);
  const userHasAccess = hasAccess(endpoint);

  console.log("=== Access Control ===");
  console.log("Endpoint:", endpoint);
  console.log("Required Level:", accessLevel);
  console.log("Has Access:", userHasAccess);
  console.log("=====================");
}
