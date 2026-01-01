"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, authService } from "@/lib/api/services";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: any) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  setPendingAction: (action: (() => Promise<void> | void) | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAction, setPendingActionState] = useState<
    (() => Promise<void> | void) | null
  >(null);

  // Helper to maintain type safety
  const setPendingAction = (action: (() => Promise<void> | void) | null) => {
    setPendingActionState(() => action);
  };

  useEffect(() => {
    // Initial load: Try to fetch user from session
    const storedUser = authService.getStoredUser();

    // Even if we have a stored user, we verify with the API because cookies handle auth
    // We optimistically show the stored user if available
    if (storedUser) {
      setUser(storedUser);
    }

    // Always fetch fresh data to confirm session validity
    console.log("AuthContext: Validating session...");
    refreshUser().finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Execute pending action when user becomes authenticated
  useEffect(() => {
    if (user && pendingAction) {
      console.log("AuthContext: Executing pending action...");
      const action = pendingAction;
      setPendingActionState(null); // Clear first to prevent double execution
      Promise.resolve(action()).catch((err) =>
        console.error("AuthContext: Pending action failed", err)
      );
    }
  }, [user, pendingAction]);

  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        // Only update if data actually changed to avoid re-renders
        setUser((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(response.data)) {
            console.log("AuthContext: User data refreshed from API");
            return response.data;
          }
          return prev;
        });
      }
    } catch (error: any) {
      console.error("AuthContext: Refresh failed", error);
      // Only clear session if strictly 401 (Unauthorized)
      if (error?.response?.status === 401 || error?.status === 401) {
        console.log("AuthContext: Session invalid, logging out");
        logout();
      }
    }
  };

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setPendingActionState(null);
      // Redirect to home after logout to ensure user isn't stuck on a protected page
      window.location.href = "/";
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        setPendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
