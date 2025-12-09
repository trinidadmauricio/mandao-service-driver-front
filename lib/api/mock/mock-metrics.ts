/**
 * Mock data para métricas/reportes
 */

export interface MockDriverMetrics {
  total_orders_today: number;
  completed_today: number;
  revenue_today: number;
  in_transit: number;
  total_deliveries: number;
  avg_rating?: number;
  total_revenue: number;
}

export const mockGetDriverMetrics = async (
  _driverId: string,
  _startDate?: string,
  _endDate?: string
): Promise<MockDriverMetrics> => {
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

