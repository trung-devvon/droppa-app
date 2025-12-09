import { apiClient } from '@/src/lib/apiClient';
import type {
  APIResponse,
  CreateOrderRequest,
  PaginatedResponse,
  UpdateOrderRequest,
} from '@/src/types/api';
import type { Order } from '@/src/types/models';

/**
 * Order Service
 */
export const orderService = {
  /**
   * Get all orders (with pagination)
   */
  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: Order['status'];
  }): Promise<PaginatedResponse<Order>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const response = await apiClient.get<APIResponse<PaginatedResponse<Order>>>(
      `/orders?${queryParams.toString()}`
    );
    return response.data;
  },

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get<APIResponse<Order>>(`/orders/${id}`);
    return response.data;
  },

  /**
   * Create new order
   */
  async createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post<APIResponse<Order>>('/orders', data);
    return response.data;
  },

  /**
   * Update order
   */
  async updateOrder(id: string, data: UpdateOrderRequest): Promise<Order> {
    const response = await apiClient.patch<APIResponse<Order>>(
      `/orders/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Cancel order
   */
  async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.post<APIResponse<Order>>(
      `/orders/${id}/cancel`
    );
    return response.data;
  },

  /**
   * Track order
   */
  async trackOrder(trackingNumber: string): Promise<Order> {
    const response = await apiClient.get<APIResponse<Order>>(
      `/orders/track/${trackingNumber}`
    );
    return response.data;
  },
};
