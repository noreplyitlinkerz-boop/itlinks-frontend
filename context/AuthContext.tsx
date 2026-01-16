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
    const initAuth = async () => {
      const storedUser = authService.getStoredUser();

      // Optimistically set the stored user if it exists
      if (storedUser) {
        setUser(storedUser);
      }

      try {
        // Always verify with the API because session is cookie-based
        console.log("AuthContext: Initializing/Validating session...");
        await refreshUser();
      } catch (error: any) {
        // If it's a 401 during initialization, it just means no session exists
        // We only care if we thought we were logged in (storedUser existed)
        if (
          storedUser &&
          (error?.response?.status === 401 || error?.status === 401)
        ) {
          console.log("AuthContext: Stored session expired, clearing storage.");
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
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
      const userData = (response as any).user || response.data || response;

      if (userData && userData._id) {
        console.log("AuthContext: refreshUser got data:", userData._id);
        // Only update if data actually changed to avoid re-renders
        setUser((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(userData)) {
            console.log("AuthContext: User data refreshed from API");
            return userData;
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
