/**
 * Mock data para métricas/reportes
 */

import type { DriverMetrics } from '@/types/api';

export const mockGetDriverMetrics = async (
  _driverId: string,
  _startDate?: string,
  _endDate?: string
): Promise<DriverMetrics> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    total_orders_today: 8,
    completed_today: 5,
    revenue_today: 125.50,
    in_transit: 2,
    total_deliveries: 150,
    avg_rating: 4.5,
    total_revenue: 3750.00,
  };
};

