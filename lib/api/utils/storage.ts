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
function getStorage(): Storage {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }

  // Fallback for SSR
  const memoryStorage = new Map<string, string>();
  return {
    getItem: (key: string) => memoryStorage.get(key) || null,
    setItem: (key: string, value: string) => memoryStorage.set(key, value),
    removeItem: (key: string) => memoryStorage.delete(key),
    clear: () => memoryStorage.clear(),
  };
}

const storage = getStorage();

/**
 * Token Storage
 */
export const TokenStorage = {
  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return storage.getItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    storage.setItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  /**
   * Remove access token
   */
  removeAccessToken(): void {
    storage.removeItem(API_CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return storage.getItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
  },

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void {
    storage.setItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  /**
   * Remove refresh token
   */
  removeRefreshToken(): void {
    storage.removeItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
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
    const userData = storage.getItem(API_CONFIG.STORAGE_KEYS.USER);
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
    storage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
  },

  /**
   * Remove user data
   */
  removeUser(): void {
    storage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
  },
};

/**
 * Clear all stored data
 */
export function clearAllStorage(): void {
  TokenStorage.clearTokens();
  UserStorage.removeUser();
}
