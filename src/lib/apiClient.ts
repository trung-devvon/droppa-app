import { storage, STORAGE_KEYS } from './storage';

/**
 * API Configuration
 */
const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.droppa.com',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

/**
 * API Error class
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Request interceptor type
 */
type RequestInterceptor = (config: RequestConfig) => Promise<RequestConfig> | RequestConfig;

/**
 * Response interceptor type
 */
type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

/**
 * Request configuration
 */
interface RequestConfig extends RequestInit {
  url: string;
  timeout?: number;
  retry?: number;
  skipAuth?: boolean;
}

/**
 * API Client class with interceptors
 */
class APIClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor() {
    // Add default request interceptor for auth token
    this.addRequestInterceptor(async (config) => {
      if (!config.skipAuth) {
        const token = await storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }
      return config;
    });

    // Add default response interceptor for error handling
    this.addResponseInterceptor(async (response) => {
      if (!response.ok) {
        const error = await this.handleErrorResponse(response);
        throw error;
      }
      return response;
    });
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(response: Response): Promise<APIError> {
    let errorMessage = 'Đã xảy ra lỗi';
    let errorData;

    try {
      errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }

    // Handle specific status codes
    switch (response.status) {
      case 401:
        // Unauthorized - clear auth and redirect to login
        await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        await storage.remove(STORAGE_KEYS.USER_DATA);
        errorMessage = 'Phiên đăng nhập đã hết hạn';
        break;
      case 403:
        errorMessage = 'Bạn không có quyền thực hiện hành động này';
        break;
      case 404:
        errorMessage = 'Không tìm thấy dữ liệu';
        break;
      case 500:
        errorMessage = 'Lỗi server. Vui lòng thử lại sau';
        break;
    }

    return new APIError(errorMessage, response.status, errorData);
  }

  /**
   * Make HTTP request with timeout and retry
   */
  private async fetchWithTimeout(
    url: string,
    config: RequestInit,
    timeout: number,
    retryCount: number = 0
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Retry on network errors
      if (retryCount < API_CONFIG.RETRY_ATTEMPTS && error.name !== 'AbortError') {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
        return this.fetchWithTimeout(url, config, timeout, retryCount + 1);
      }

      if (error.name === 'AbortError') {
        throw new APIError('Request timeout');
      }

      throw new APIError('Network error. Vui lòng kiểm tra kết nối internet');
    }
  }

  /**
   * Execute request with interceptors
   */
  async request<T = any>(config: RequestConfig): Promise<T> {
    // Apply request interceptors
    let finalConfig = config;
    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig);
    }

    // Build full URL
    const url = finalConfig.url.startsWith('http')
      ? finalConfig.url
      : `${API_CONFIG.BASE_URL}${finalConfig.url}`;

    // Set default headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...finalConfig.headers,
    };

    // Make request
    let response = await this.fetchWithTimeout(
      url,
      {
        ...finalConfig,
        headers,
      },
      finalConfig.timeout || API_CONFIG.TIMEOUT
    );

    // Apply response interceptors
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      url,
      method: 'GET',
      ...config,
    });
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      url,
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      url,
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      url,
      method: 'DELETE',
      ...config,
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient();
