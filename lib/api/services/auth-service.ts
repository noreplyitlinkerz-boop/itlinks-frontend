/**
 * Auth Service
 * API methods for authentication operations
 */

import { BaseService } from "./base-service";
import {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  User,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";
import { TokenStorage, UserStorage, clearAllStorage } from "../utils/storage";

class AuthService extends BaseService {
  protected basePath = "/api/auth";

  /**
   * Register new user
   * @public
   * @endpoint POST /api/auth/signup
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/signup", data);

    // Store token and user data
    if (response.token) {
      TokenStorage.setAccessToken(response.token);
      UserStorage.setUser(response.user);
    }

    return response;
  }

  /**
   * Login user
   * @public
   * @endpoint POST /api/auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>("/login", data);

    // Store token and user data
    if (response.token) {
      TokenStorage.setAccessToken(response.token);
      UserStorage.setUser(response.user);
    }

    return response;
  }

  /**
   * Logout current user
   * @authenticated Requires authentication
   * @endpoint POST /api/auth/logout
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await this.post<ApiResponse<{ message: string }>>(
        "/logout"
      );
      return response;
    } finally {
      // Clear stored data regardless of API response
      clearAllStorage();
    }
  }

  /**
   * Get current logged-in user
   * @authenticated Requires authentication
   * @endpoint GET /api/auth/me
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await this.get<ApiResponse<User>>("/me");

    // Update stored user data
    if (response.data) {
      UserStorage.setUser(response.data);
    }

    return response;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return TokenStorage.isAuthenticated();
  }

  /**
   * Get stored user data
   */
  getStoredUser<T = User>(): T | null {
    return UserStorage.getUser<T>();
  }
}

// Export singleton instance
export const authService = new AuthService();
