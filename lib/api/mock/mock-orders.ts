/**
 * Mock data para órdenes
 */

import type { Order, OrdersResponse, OrderStatus } from '@/types/api';

const mockOrders: Order[] = [
  {
    id: 'order-1',
    order_number: 'ORD-001',
    order_display_number: 'SHIP-001',
    tracking_code: 'TRK-001',
    status: 'ASSIGNED',
    order_type: 'ON_DEMAND',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    customer_name: 'María González',
    customer_phone: '+1234567890',
    delivery_address: 'Calle Principal 123, Ciudad',
  },
  {
    id: 'order-2',
    order_number: 'ORD-002',
    order_display_number: 'SHIP-002',
    tracking_code: 'TRK-002',
    status: 'IN_TRANSIT',
    order_type: 'RETAIL',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    customer_name: 'Carlos Rodríguez',
    customer_phone: '+1234567891',
    delivery_address: 'Avenida Central 456, Ciudad',
  },
  {
    id: 'order-3',
    order_number: 'ORD-003',
    order_display_number: 'SHIP-003',
    tracking_code: 'TRK-003',
    status: 'DELIVERED',
    order_type: 'ON_DEMAND',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
    customer_name: 'Ana Martínez',
    customer_phone: '+1234567892',
    delivery_address: 'Plaza Mayor 789, Ciudad',
  },
];

export const mockGetOrders = async (
  _driverId: string,
  filters?: {
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
  }
): Promise<OrdersResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...mockOrders];

  if (filters?.status) {
    filtered = filtered.filter((o) => o.status === filters.status);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.tracking_code.toLowerCase().includes(searchLower) ||
        o.order_display_number.toLowerCase().includes(searchLower) ||
        o.customer_name?.toLowerCase().includes(searchLower)
    );
  }

  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

export const mockGetOrder = async (orderId: string): Promise<Order> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const order = mockOrders.find((o) => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

export const mockUpdateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  _notes?: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const order = mockOrders.find((o) => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.status = status;
  order.updated_at = new Date().toISOString();
};

