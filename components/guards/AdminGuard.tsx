/**
 * AdminGuard Component
 * Protects admin routes by verifying user role
 */

"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/hooks/useAdminAuth";

interface AdminGuardProps {
  /**
   * Child components to render if user is admin
   */
  children: ReactNode;

  /**
   * Path to redirect to if user is not admin
   * @default "/login"
   */
  redirectTo?: string;

  /**
   * Custom loading component
   */
  loadingComponent?: ReactNode;

  /**
   * Custom unauthorized component
   */
  unauthorizedComponent?: ReactNode;
}

/**
 * Guard component to protect admin routes
 * Redirects non-admin users to login or specified path
 *
 * @example
 * ```tsx
 * export default function AdminPage() {
 *   return (
 *     <AdminGuard>
 *       <AdminDashboard />
 *     </AdminGuard>
 *   );
 * }
 * ```
 */
export function AdminGuard({
  children,
  redirectTo = "/login",
  loadingComponent,
  unauthorizedComponent,
}: AdminGuardProps) {
  const router = useRouter();
  const { isAdmin, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push(redirectTo);
    }
  }, [isAdmin, isLoading, router, redirectTo]);

  // Show loading state
  if (isLoading) {
    return (
      <>
        {loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Verifying access...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  // Show unauthorized state (briefly before redirect)
  if (!isAdmin) {
    return (
      <>
        {unauthorizedComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
              <p className="text-muted-foreground">
                You do not have permission to access this page.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Redirecting...
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  // User is admin, render children
  return <>{children}</>;
}
