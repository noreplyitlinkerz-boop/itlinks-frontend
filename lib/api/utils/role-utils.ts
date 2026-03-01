/**
 * Role-Based Access Control Utilities
 * Helper functions for checking user roles and endpoint access
 */

import { UserStorage } from "./storage";
import { User } from "../types/endpoints";
import {
  UserRole,
  ApiAccessLevel,
  isAdminRole,
  isPublicEndpoint,
  isAdminEndpoint,
  getEndpointAccessLevel,
} from "../types/api-roles";

// ============================================================================
// User Role Checks
// ============================================================================

/**
 * Check if the current user is an admin
 */
export function isAdmin(): boolean {
  const user = UserStorage.getUser<User>();
  return user ? isAdminRole(user.role) : false;
}

/**
 * Check if the current user is a customer
 */
export function isCustomer(): boolean {
  const user = UserStorage.getUser<User>();
  return user?.role === UserRole.USER;
}

/**
 * Get the current user's role
 */
export function getCurrentUserRole(): UserRole | null {
  const user = UserStorage.getUser<User>();
  return user?.role ? (user.role as UserRole) : null;
}

/**
 * Check if user is authenticated (has valid user data)
 */
export function isAuthenticated(): boolean {
  const user = UserStorage.getUser<User>();
  return user !== null;
}

// ============================================================================
// Endpoint Access Checks
// ============================================================================

/**
 * Check if the current user has access to a specific endpoint
 * @param endpoint - Endpoint in format "METHOD /path"
 * @returns true if user has access, false otherwise
 */
export function hasAccess(endpoint: string): boolean {
  const accessLevel = getEndpointAccessLevel(endpoint);
  const userRole = getCurrentUserRole();

  switch (accessLevel) {
    case ApiAccessLevel.PUBLIC:
      return true;

    case ApiAccessLevel.AUTHENTICATED:
      return isAuthenticated();

    case ApiAccessLevel.ADMIN:
      return isAdminRole(userRole);

    default:
      return false;
  }
}

/**
 * Check if the current user can access an endpoint
 * Throws an error if access is denied
 * @param endpoint - Endpoint in format "METHOD /path"
 * @throws Error if user doesn't have access
 */
export function requireAccess(endpoint: string): void {
  if (!hasAccess(endpoint)) {
    const accessLevel = getEndpointAccessLevel(endpoint);

    if (accessLevel === ApiAccessLevel.ADMIN) {
      throw new Error("Admin access required");
    }

    if (accessLevel === ApiAccessLevel.AUTHENTICATED) {
      throw new Error("Authentication required");
    }

    throw new Error("Access denied");
  }
}

/**
 * Check if the current user can access admin endpoints
 * @returns true if user is admin, false otherwise
 */
export function canAccessAdminPanel(): boolean {
  return isAdmin();
}

/**
 * Require admin access, throw error if not admin
 * @throws Error if user is not admin
 */
export function requireAdmin(): void {
  if (!isAdmin()) {
    throw new Error("Admin access required");
  }
}

/**
 * Require authentication, throw error if not authenticated
 * @throws Error if user is not authenticated
 */
export function requireAuth(): void {
  if (!isAuthenticated()) {
    throw new Error("Authentication required");
  }
}

// ============================================================================
// Endpoint Validation
// ============================================================================

/**
 * Validate that an endpoint matches the expected access level
 * Useful for development/debugging
 * @param endpoint - Endpoint in format "METHOD /path"
 * @param expectedLevel - Expected access level
 * @returns true if matches, false otherwise
 */
export function validateEndpointAccess(
  endpoint: string,
  expectedLevel: ApiAccessLevel
): boolean {
  const actualLevel = getEndpointAccessLevel(endpoint);
  return actualLevel === expectedLevel;
}

/**
 * Get a human-readable description of endpoint access requirements
 * @param endpoint - Endpoint in format "METHOD /path"
 * @returns Description string
 */
export function getAccessDescription(endpoint: string): string {
  const level = getEndpointAccessLevel(endpoint);

  switch (level) {
    case ApiAccessLevel.PUBLIC:
      return "Public - No authentication required";
    case ApiAccessLevel.AUTHENTICATED:
      return "Authenticated - Requires valid user token";
    case ApiAccessLevel.ADMIN:
      return "Admin Only - Requires admin role";
    default:
      return "Unknown access level";
  }
}

// ============================================================================
// Development Helpers
// ============================================================================

/**
 * Log current user's access information (development only)
 */
export function logAccessInfo(): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const user = UserStorage.getUser<User>();
  console.log("=== Access Info ===");
  console.log("Authenticated:", isAuthenticated());
  console.log("Role:", getCurrentUserRole());
  console.log("Is Admin:", isAdmin());
  console.log("Is Customer:", isCustomer());
  console.log("User:", user);
  console.log("==================");
}
