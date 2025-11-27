/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MetricsCards } from '../metrics-cards';
import { useMetrics } from '@/lib/hooks/use-metrics';

jest.mock('@/lib/hooks/use-metrics', () => ({
  useMetrics: jest.fn(),
}));

describe('MetricsCards', () => {
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
  });

  it('should show skeleton loaders while loading', () => {
    (useMetrics as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<MetricsCards />, { wrapper });

    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should display metrics when loaded', async () => {
    (useMetrics as jest.Mock).mockReturnValue({
      data: {
        total_orders_today: 8,
        completed_today: 5,
        revenue_today: 125.5,
        in_transit: 2,
        total_deliveries: 150,
        avg_rating: 4.5,
        total_revenue: 3750.0,
      },
      isLoading: false,
      error: null,
    });

    render(<MetricsCards />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('should show error message on error', () => {
    (useMetrics as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    render(<MetricsCards />, { wrapper });

    expect(screen.getByText(/error al cargar métricas/i)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', async () => {
    (useMetrics as jest.Mock).mockReturnValue({
      data: {
        total_orders_today: 8,
        completed_today: 5,
        revenue_today: 125.5,
        in_transit: 2,
        total_deliveries: 150,
        avg_rating: 4.5,
        total_revenue: 3750.0,
      },
      isLoading: false,
      error: null,
    });

    render(<MetricsCards />, { wrapper });

    await waitFor(() => {
      const cards = screen.getAllByRole('article');
      expect(cards.length).toBe(4);
    });
  });
});

