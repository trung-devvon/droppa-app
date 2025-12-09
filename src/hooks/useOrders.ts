import { orderService } from '@/src/services/orderService';
import type { CreateOrderRequest, UpdateOrderRequest } from '@/src/types/api';
import type { Order } from '@/src/types/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * useOrders hook - Fetch all orders with pagination
 */
export function useOrders(params?: {
  page?: number;
  limit?: number;
  status?: Order['status'];
}) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderService.getOrders(params),
  });
}

/**
 * useOrder hook - Fetch single order by ID
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
}

/**
 * useTrackOrder hook - Track order by tracking number
 */
export function useTrackOrder(trackingNumber: string) {
  return useQuery({
    queryKey: ['orders', 'track', trackingNumber],
    queryFn: () => orderService.trackOrder(trackingNumber),
    enabled: !!trackingNumber,
  });
}

/**
 * useCreateOrder hook - Create new order mutation
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderService.createOrder(data),
    onSuccess: () => {
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

/**
 * useUpdateOrder hook - Update order mutation
 */
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderRequest }) =>
      orderService.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Update single order cache
      queryClient.setQueryData(['orders', updatedOrder.id], updatedOrder);
    },
  });
}

/**
 * useCancelOrder hook - Cancel order mutation
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: (cancelledOrder) => {
      // Invalidate orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      
      // Update single order cache
      queryClient.setQueryData(['orders', cancelledOrder.id], cancelledOrder);
    },
  });
}
