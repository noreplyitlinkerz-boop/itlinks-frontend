/**
 * Storage Utilities
 * Secure token and data storage management
 */

import { API_CONFIG } from "../api-config";

/**
 * Storage interface for consistent API
 */
interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

/**
 * Get storage instance (localStorage in browser, memory fallback for SSR)
 */
// Singleton memory storage for fallback (SSR/Server)
const memoryStorage = new Map<string, string>();

/**
 * Get storage instance (localStorage in browser, memory fallback for SSR)
 */
function getStorage(): Storage {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }

  // Fallback for SSR/Server
  return {
    getItem: (key: string) => memoryStorage.get(key) || null,
    setItem: (key: string, value: string) => memoryStorage.set(key, value),
    removeItem: (key: string) => memoryStorage.delete(key),
    clear: () => memoryStorage.clear(),
  };
}

import Cookies from "js-cookie";

/**
 * Token Storage
 */
export const TokenStorage = {
  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return Cookies.get(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN) || null;
  },

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    Cookies.set(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, token, {
      expires: 7, // 7 days
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  },

  /**
   * Remove access token
   */
  removeAccessToken(): void {
    Cookies.remove(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, { path: "/" });
  },

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return Cookies.get(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN) || null;
  },

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void {
    Cookies.set(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, token, {
      expires: 30, // 30 days
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  },

  /**
   * Remove refresh token
   */
  removeRefreshToken(): void {
    Cookies.remove(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, { path: "/" });
  },

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};

/**
 * User Storage
 */
export const UserStorage = {
  /**
   * Get stored user data
   */
  getUser<T = unknown>(): T | null {
    const userData = getStorage().getItem(API_CONFIG.STORAGE_KEYS.USER);
    if (!userData) return null;

    try {
      return JSON.parse(userData) as T;
    } catch {
      return null;
    }
  },

  /**
   * Set user data
   */
  setUser<T = unknown>(user: T): void {
    getStorage().setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
  },

  /**
   * Remove user data
   */
  removeUser(): void {
    getStorage().removeItem(API_CONFIG.STORAGE_KEYS.USER);
  },
};

/**
 * Clear all stored data
 */
export function clearAllStorage(): void {
  TokenStorage.clearTokens();
  UserStorage.removeUser();
}
