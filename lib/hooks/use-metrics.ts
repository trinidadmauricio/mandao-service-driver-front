'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { isMockMode } from '@/lib/api/mock';
import { mockGetDriverMetrics } from '@/lib/api/mock/mock-metrics';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { DriverMetrics } from '@/types/api';

export function useMetrics(startDate?: string, endDate?: string) {
  const { user } = useAuth();
  const driverId = user?.id;

  return useQuery({
    queryKey: ['driver-metrics', driverId, startDate, endDate],
    queryFn: async (): Promise<DriverMetrics> => {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }

      if (isMockMode()) {
        return await mockGetDriverMetrics(driverId, startDate, endDate);
      }

      const response = await apiClient.get<{ data: DriverMetrics }>(endpoints.reports.drivers, {
        params: {
          driver_id: driverId,
          start_date: startDate,
          end_date: endDate,
        },
      });

      return response.data.data;
    },
    enabled: !!driverId,
    staleTime: 60 * 1000, // 1 minute
  });
}

