'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, CheckCircle2, DollarSign, Truck } from 'lucide-react';
import { useMetrics } from '@/lib/hooks/use-metrics';
import { formatCurrency } from '@/lib/utils/currency';

export function MetricsCards() {
  const { data: metrics, isLoading, error } = useMetrics();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32 mb-1" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Error al cargar métricas</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cards = [
    {
      title: 'Órdenes del Día',
      value: metrics.total_orders_today.toString(),
      description: 'Total de órdenes asignadas hoy',
      icon: Package,
      iconColor: 'text-blue-600',
    },
    {
      title: 'Entregas Completadas',
      value: metrics.completed_today.toString(),
      description: 'Entregas completadas hoy',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
    },
    {
      title: 'Ingresos del Día',
      value: formatCurrency(metrics.revenue_today, 'USD'),
      description: 'Ingresos generados hoy',
      icon: DollarSign,
      iconColor: 'text-yellow-600',
    },
    {
      title: 'En Tránsito',
      value: metrics.in_transit.toString(),
      description: 'Órdenes actualmente en tránsito',
      icon: Truck,
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.iconColor}`} aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

