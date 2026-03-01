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
  ForgotPasswordRequest,
  VerifyResetOtpRequest,
  ResetPasswordRequest,
} from "../types/endpoints";
import { ApiResponse } from "../types/api-types";
import { TokenStorage, UserStorage, clearAllStorage } from "../utils/storage";
import { API_CONFIG } from "../api-config";

class AuthService extends BaseService {
  protected basePath = "/api/auth";

  /**
   * Register new user
   * @public
   * @endpoint POST /api/auth/signup
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await this.post<any>("/signup", data);
    // Robustly extract user data
    const userData = response.user || response.data?.user || response.data;

    // Store user data (session handled by browser cookies)
    if (userData) {
      UserStorage.setUser(userData);
    }

    // Return in the format expected by components
    return {
      ...response,
      user: userData,
    };
  }

  /**
   * Login user
   * @public
   * @endpoint POST /api/auth/login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.post<any>("/login", data);
    // Robustly extract user data based on known nested structure
    const userData = response.user || response.data?.user || response.data;

    // Store user data (session handled by browser cookies)
    if (userData && userData._id) {
      UserStorage.setUser(userData);
    }

    // Return in the format expected by components, ensuring .user is populated
    return {
      ...response,
      user: userData,
    };
  }

  /**
   * Logout current user
   * @authenticated Requires authentication
   * @endpoint POST /api/auth/logout
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response =
        await this.post<ApiResponse<{ message: string }>>("/logout");
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
    const response = await this.get<any>("/me");
    // Extract user from .user or .data or fallback to response itself
    const userData = response.user || response.data || response;

    // console.log("authService: Extracted user data:", userData);

    // Update stored user data
    if (userData && userData._id) {
      UserStorage.setUser(userData);
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
   * Initiate Google OAuth login
   * @endpoint GET /api/auth/google
   */
  initiateGoogleLogin(): void {
    const googleAuthUrl = `${API_CONFIG.BASE_URL}${this.basePath}/google`;
    window.location.href = googleAuthUrl;
  }

  /**
   * Get stored user data
   */
  getStoredUser<T = User>(): T | null {
    return UserStorage.getUser<T>();
  }

  /**
   * Request password reset OTP
   * @public
   * @endpoint POST /api/auth/forgot-password
   */
  async forgotPassword(
    data: ForgotPasswordRequest,
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<ApiResponse<{ message: string }>>(
      "/forgot-password",
      data,
    );
  }

  /**
   * Verify password reset OTP
   * @public
   * @endpoint POST /api/auth/verify-reset-otp
   */
  async verifyResetOtp(
    data: VerifyResetOtpRequest,
  ): Promise<ApiResponse<{ message: string; otpVerified: boolean }>> {
    return this.post<ApiResponse<{ message: string; otpVerified: boolean }>>(
      "/verify-reset-otp",
      data,
    );
  }

  /**
   * Reset password
   * @public
   * @endpoint POST /api/auth/reset-password
   */
  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post<ApiResponse<{ message: string }>>("/reset-password", data);
  }
}

// Export singleton instance
export const authService = new AuthService();
