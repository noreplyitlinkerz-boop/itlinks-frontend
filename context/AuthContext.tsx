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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load: get user from local storage or API
    const storedUser = authService.getStoredUser();
    const token = authService.isAuthenticated(); // Checks if token exists

    console.log("AuthContext: Initial Load", { storedUser, hasToken: token });

    if (storedUser) {
      setUser(storedUser);
    }

    // Check with API to ensure token is still valid
    if (token) {
      console.log("AuthContext: Refreshing user...");
      refreshUser().finally(() => setIsLoading(false));
    } else {
      console.log("AuthContext: No token found, not authenticated");
      setIsLoading(false);
    }
  }, []);

  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        console.log("AuthContext: User refreshed successfully", response.data);
        setUser(response.data);
      }
    } catch (error: any) {
      console.error("AuthContext: Refresh failed", error);
      // Only clear user if unauthorized (401)
      if (error?.response?.status === 401 || error?.status === 401) {
        console.log("AuthContext: 401 Unauthorized, clearing session");
        setUser(null);
        // Clear storage to prevent infinite loop of trying to refresh invalid token
        authService.logout().catch(() => {});
      }
      // For other errors (network, 500, etc), keep the stored user state
      // This prevents logout on temporary connectivity issues
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
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
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
