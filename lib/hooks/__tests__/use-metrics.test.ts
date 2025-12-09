/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMetrics } from '../use-metrics';
import { useAuth } from '../use-auth';
import { isMockMode } from '@/lib/api/mock';
import { mockGetDriverMetrics } from '@/lib/api/mock/mock-metrics';

jest.mock('../use-auth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/lib/api/mock', () => ({
  isMockMode: jest.fn(),
}));

jest.mock('@/lib/api/mock/mock-metrics', () => ({
  mockGetDriverMetrics: jest.fn(),
}));

jest.mock('@/lib/api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('useMetrics', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should fetch metrics in mock mode', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'driver-1' },
    });
    (isMockMode as jest.Mock).mockReturnValue(true);
    (mockGetDriverMetrics as jest.Mock).mockResolvedValue({
      total_orders_today: 8,
      completed_today: 5,
      revenue_today: 125.5,
      in_transit: 2,
      total_deliveries: 150,
      avg_rating: 4.5,
      total_revenue: 3750.0,
    });

    const { result } = renderHook(() => useMetrics(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      total_orders_today: 8,
      completed_today: 5,
      revenue_today: 125.5,
      in_transit: 2,
      total_deliveries: 150,
      avg_rating: 4.5,
      total_revenue: 3750.0,
    });
  });

  it('should not fetch when user is not available', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    const { result } = renderHook(() => useMetrics(), { wrapper });

    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle loading state', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'driver-1' },
    });
    (isMockMode as jest.Mock).mockReturnValue(true);
    (mockGetDriverMetrics as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { result } = renderHook(() => useMetrics(), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });
});

