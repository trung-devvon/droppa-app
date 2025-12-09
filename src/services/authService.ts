import { apiClient } from '@/src/lib/apiClient';
import type {
  APIResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
} from '@/src/types/api';

/**
 * Auth Service
 */
export const authService = {
  /**
   * Login
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<APIResponse<LoginResponse>>(
      '/auth/login',
      data,
      { skipAuth: true } // Don't send auth token for login
    );
    return response.data;
  },

  /**
   * Register
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<APIResponse<RegisterResponse>>(
      '/auth/register',
      data,
      { skipAuth: true }
    );
    return response.data;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  /**
   * Forgot password
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post<APIResponse>(
      '/auth/forgot-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Reset password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post<APIResponse>(
      '/auth/reset-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    const response = await apiClient.get<APIResponse>('/auth/me');
    return response.data;
  },

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiClient.post<APIResponse<{ token: string }>>(
      '/auth/refresh',
      { refreshToken },
      { skipAuth: true }
    );
    return response.data;
  },
};
