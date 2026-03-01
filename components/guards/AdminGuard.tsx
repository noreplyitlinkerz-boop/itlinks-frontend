/**
 * AdminGuard Component
 * Protects admin routes by verifying user role
 */

"use client";

import { useEffect, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/hooks/useAdminAuth";
import { AuthContext, useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

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
  redirectTo = "/",
  loadingComponent,
  unauthorizedComponent,
}: AdminGuardProps) {
  const router = useRouter();
  const { isAdmin, isLoading } = useAdminAuth();
  const { user, logout } = useAuth();

  useEffect(() => {
    // If not loading and not an admin
    if (!isLoading && !isAdmin) {
      // If user is logged in but NOT an admin, log them out as requested
      if (user) {
        console.warn("AdminGuard: Unauthorized access attempt, logging out...");
        logout();
      } else {
        // If not logged in at all, just go home
        router.replace(redirectTo);
      }
    }
  }, [isAdmin, isLoading, user, logout, router, redirectTo]);

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

  // Show unauthorized state (while logout/redirect processes)
  if (!isAdmin) {
    return (
      <>
        {unauthorizedComponent || (
          <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center space-y-4 p-8 rounded-lg border border-border bg-card shadow-lg max-w-md mx-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Access Denied
                </h1>
                <p className="text-muted-foreground mt-2">
                  You do not have permission to view this page. You have been
                  logged out for security.
                </p>
              </div>
              <div className="pt-4">
                <Button onClick={() => router.push("/")} className="w-full">
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // User is admin, render children
  return <>{children}</>;
}
