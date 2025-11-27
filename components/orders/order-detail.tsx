'use client';

import { useOrder } from '@/lib/hooks/use-orders';
import { OrderStatusBadge } from './order-status-badge';
import { UpdateStatusDialog } from './update-status-dialog';
import { OrderTimeline } from './order-timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils/currency';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Package, User, MapPin, Phone, Calendar, DollarSign } from 'lucide-react';

interface OrderDetailProps {
  orderId: string;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center p-8" role="alert">
        <p className="text-destructive">Error al cargar la orden</p>
      </div>
    );
  }

  const total = order.order_summary_totals?.[0]?.total || 0;
  const currency = order.order_summary_totals?.[0]?.currency || 'USD';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Orden {order.order_display_number}
          </h1>
          <p className="text-muted-foreground mt-1">Tracking: {order.tracking_code}</p>
        </div>
        <div className="flex items-center gap-4">
          <OrderStatusBadge status={order.status} />
          <UpdateStatusDialog orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      {/* Información Principal */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" aria-hidden="true" />
              Información de la Orden
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <p>{order.order_type === 'RETAIL' ? 'Retail' : 'On-Demand'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <OrderStatusBadge status={order.status} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Fecha de Creación
              </p>
              <p>{format(new Date(order.created_at), "PPpp", { locale: es })}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
              <p>{format(new Date(order.updated_at), "PPpp", { locale: es })}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" aria-hidden="true" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.customer_name && (
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" aria-hidden="true" />
                  Nombre
                </p>
                <p>{order.customer_name}</p>
              </div>
            )}
            {order.customer_phone && (
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Teléfono
                </p>
                <p>{order.customer_phone}</p>
              </div>
            )}
            {order.delivery_address && (
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Dirección de Entrega
                </p>
                <p>{order.delivery_address}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Totales */}
      {total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" aria-hidden="true" />
              Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold">{formatCurrency(total, currency as any)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Estados</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTimeline order={order} />
        </CardContent>
      </Card>
    </div>
  );
}

