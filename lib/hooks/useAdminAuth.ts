/**
 * useAdminAuth Hook
 * Custom React hook for admin authentication and role verification
 */

"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { isAdmin, canAccessAdminPanel } from "@/lib/api/services";

export interface UseAdminAuthReturn {
  /**
   * Whether the current user is an admin
   */
  isAdmin: boolean;

  /**
   * Whether the user can access the admin panel
   */
  canAccessAdminPanel: boolean;

  /**
   * Whether the auth check is still loading
   */
  isLoading: boolean;

  /**
   * Redirect non-admin users to specified path
   * @param redirectTo - Path to redirect to (default: "/login")
   */
  requireAdmin: (redirectTo?: string) => void;
}

/**
 * Hook for admin authentication and authorization
 *
 * @example
 * ```tsx
 * function AdminPage() {
 *   const { isAdmin, requireAdmin, isLoading } = useAdminAuth();
 *
 *   useEffect(() => {
 *     requireAdmin();
 *   }, []);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (!isAdmin) return null;
 *
 *   return <div>Admin Content</div>;
 * }
 * ```
 */
export function useAdminAuth(): UseAdminAuthReturn {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAdminAuth must be used within an AuthProvider");
  }

  const { user, isLoading } = authContext;

  // Use the user from context for reactivity
  const userIsAdmin = user?.role === "admin";
  const userCanAccessAdminPanel = user?.role === "admin";

  const requireAdmin = (redirectTo: string = "/") => {
    if (!isLoading && !userIsAdmin) {
      router.push(redirectTo);
    }
  };

  return {
    isAdmin: userIsAdmin,
    canAccessAdminPanel: userCanAccessAdminPanel,
    isLoading,
    requireAdmin,
  };
}
