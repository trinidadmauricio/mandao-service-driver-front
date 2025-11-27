'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types/api';
import { Package, Clock, CheckCircle2, XCircle, AlertCircle, Truck } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ComponentType<{ className?: string }> }
> = {
  DRAFT: {
    label: 'Borrador',
    variant: 'outline',
    icon: Package,
  },
  PENDING: {
    label: 'Pendiente',
    variant: 'secondary',
    icon: Clock,
  },
  CONFIRMED: {
    label: 'Confirmada',
    variant: 'default',
    icon: CheckCircle2,
  },
  ASSIGNED: {
    label: 'Asignada',
    variant: 'default',
    icon: Package,
  },
  IN_TRANSIT: {
    label: 'En Tránsito',
    variant: 'default',
    icon: Truck,
  },
  DELIVERED: {
    label: 'Entregada',
    variant: 'default',
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: 'Cancelada',
    variant: 'destructive',
    icon: XCircle,
  },
  FAILED: {
    label: 'Fallida',
    variant: 'destructive',
    icon: AlertCircle,
  },
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={cn('flex items-center gap-1.5', className)}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span>{config.label}</span>
    </Badge>
  );
}

