'use client';

import { useDriver } from '@/lib/hooks/use-driver';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Star, TrendingUp } from 'lucide-react';

export function ProfileStats() {
  const { data: driver, isLoading } = useDriver();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!driver) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" aria-hidden="true" />
          Estadísticas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Package className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total de Entregas</p>
            <p className="text-2xl font-bold">{driver.total_deliveries}</p>
          </div>
        </div>
        {driver.rating_avg && (
          <div className="flex items-center gap-4">
            <Star className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Calificación Promedio</p>
              <p className="text-2xl font-bold">{driver.rating_avg.toFixed(1)}</p>
            </div>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-muted-foreground">Estado</p>
          <p className="text-lg font-semibold">
            {driver.availability_status === 'AVAILABLE' && 'Disponible'}
            {driver.availability_status === 'BUSY' && 'Ocupado'}
            {driver.availability_status === 'OFFLINE' && 'Desconectado'}
            {driver.availability_status === 'SUSPENDED' && 'Suspendido'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

