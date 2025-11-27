'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { isMockMode } from '@/lib/api/mock';
import { mockGetOrders, mockGetOrder, mockUpdateOrderStatus } from '@/lib/api/mock/mock-orders';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { Order, OrdersResponse, OrderStatus } from '@/types/api';

export interface OrdersFilters {
  status?: OrderStatus;
  page?: number;
  limit?: number;
  search?: string;
  start_date?: string;
  end_date?: string;
}

export function useOrders(filters?: OrdersFilters) {
  const { user } = useAuth();
  const driverId = user?.id;

  return useQuery({
    queryKey: ['orders', driverId, filters],
    queryFn: async (): Promise<OrdersResponse> => {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }

      if (isMockMode()) {
        return await mockGetOrders(driverId, {
          status: filters?.status,
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          search: filters?.search,
        });
      }

      const response = await apiClient.get<{ data: OrdersResponse }>(endpoints.orders.list, {
        params: {
          driver_id: driverId,
          ...filters,
        },
      });

      return response.data.data;
    },
    enabled: !!driverId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useOrder(orderId: string) {
  const { user } = useAuth();
  const driverId = user?.id;

  return useQuery({
    queryKey: ['order', orderId, driverId],
    queryFn: async (): Promise<Order> => {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }

      if (isMockMode()) {
        return await mockGetOrder(orderId);
      }

      const response = await apiClient.get<{ data: Order }>(endpoints.orders.get(orderId));
      return response.data.data;
    },
    enabled: !!driverId && !!orderId,
  });
}

export interface UpdateOrderStatusParams {
  id: string;
  to_status: OrderStatus;
  notes?: string;
  cancellation_reason?: string;
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const driverId = user?.id;

  return useMutation({
    mutationFn: async (params: UpdateOrderStatusParams): Promise<void> => {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }

      if (isMockMode()) {
        await mockUpdateOrderStatus(params.id, params.to_status, params.notes);
      } else {
        await apiClient.patch(endpoints.orders.update(params.id), {
          to_status: params.to_status,
          notes: params.notes,
          cancellation_reason: params.cancellation_reason,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', driverId] });
    },
  });
}

