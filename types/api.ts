/**
 * Tipos TypeScript compartidos para la API
 */

export type UserRole = 'DRIVER' | 'OWNER' | 'SUPERVISOR' | 'MERCHANT_USER' | 'LOGISTICS_PROVIDER' | 'CUSTOMER' | 'SAAS_ADMIN' | 'SAAS_EDITOR';

export type OrderStatus = 'DRAFT' | 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'FAILED';

export type OrderType = 'RETAIL' | 'ON_DEMAND';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  email_verified: boolean;
  tenant_id?: string;
  logistics_provider_id?: string;
  active?: boolean;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface Order {
  id: string;
  order_number: string;
  order_display_number: string;
  tracking_code: string;
  status: OrderStatus;
  order_type: OrderType;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  customer_phone?: string;
  delivery_address?: string;
  order_drivers?: Array<{
    id: string;
    driver_id: string;
    is_current: boolean;
    assigned_at: string;
  }>;
  order_branches?: Array<{
    id: string;
    branch_id: string;
    is_current: boolean;
  }>;
  order_summary_totals?: Array<{
    id: string;
    is_current: boolean;
    subtotal: number;
    delivery_fee: number;
    tax: number;
    total: number;
    currency: string;
  }>;
  order_status_history?: Array<{
    id: string;
    from_status: OrderStatus;
    to_status: OrderStatus;
    changed_at: string;
    notes?: string;
  }>;
}

export interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Driver {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  identity_document: string;
  driving_license: string;
  date_of_birth: string;
  availability_status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'SUSPENDED';
  rating_avg?: number;
  total_deliveries: number;
  vehicle?: {
    id: string;
    vehicle_type: string;
    license_plate: string;
    brand: string;
    model: string;
    year: number;
  };
}

export interface DriverMetrics {
  total_orders_today: number;
  completed_today: number;
  revenue_today: number;
  in_transit: number;
  total_deliveries: number;
  avg_rating?: number;
  total_revenue: number;
}

