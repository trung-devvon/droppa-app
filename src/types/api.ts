/**
 * API Response wrapper
 */
export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Auth API types
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: import('./models').User;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  refreshToken: string;
  user: import('./models').User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * Order API types
 */
export interface CreateOrderRequest {
  sender: {
    name: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
  package: {
    weight: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
    description?: string;
  };
  notes?: string;
}

export interface UpdateOrderRequest {
  status?: import('./models').Order['status'];
  notes?: string;
}
