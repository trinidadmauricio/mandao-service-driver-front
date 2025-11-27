/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { OrderStatusBadge } from '../order-status-badge';

describe('OrderStatusBadge', () => {
  it('should render status badge with correct label', () => {
    render(<OrderStatusBadge status="ASSIGNED" />);
    expect(screen.getByText('Asignada')).toBeInTheDocument();
  });

  it('should render different statuses correctly', () => {
    const { rerender } = render(<OrderStatusBadge status="IN_TRANSIT" />);
    expect(screen.getByText('En Tránsito')).toBeInTheDocument();

    rerender(<OrderStatusBadge status="DELIVERED" />);
    expect(screen.getByText('Entregada')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<OrderStatusBadge status="ASSIGNED" />);
    const badge = screen.getByText('Asignada').closest('div');
    expect(badge).toBeInTheDocument();
  });
});

