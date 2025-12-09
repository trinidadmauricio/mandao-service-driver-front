'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { isMockMode } from '@/lib/api/mock';
import { mockGetDriver, mockUpdateDriver } from '@/lib/api/mock/mock-driver';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { Driver } from '@/types/api';

export function useDriver() {
  const { user } = useAuth();
  const driverId = user?.id;

  return useQuery({
    queryKey: ['driver', driverId],
    queryFn: async (): Promise<Driver> => {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }

      if (isMockMode()) {
        return await mockGetDriver(driverId);
      }

      const response = await apiClient.get<{ data: Driver }>(endpoints.drivers.get(driverId));
      return response.data.data;
    },
    enabled: !!driverId,
  });
}

export function useUpdateDriver() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const driverId = user?.id;

  return useMutation({
    mutationFn: async (data: Partial<Driver>): Promise<Driver> => {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }

      if (isMockMode()) {
        return await mockUpdateDriver(driverId, data);
      }

      const response = await apiClient.patch<{ data: Driver }>(
        endpoints.drivers.update(driverId),
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', driverId] });
    },
  });
}

