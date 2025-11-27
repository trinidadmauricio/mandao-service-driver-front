'use client';

import { useDriver } from '@/lib/hooks/use-driver';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Car } from 'lucide-react';

export function VehicleInfo() {
  const { data: driver, isLoading } = useDriver();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!driver?.vehicle) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" aria-hidden="true" />
            Vehículo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No hay información de vehículo disponible</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" aria-hidden="true" />
          Información del Vehículo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Tipo</p>
          <p>{driver.vehicle.vehicle_type}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Placa</p>
          <p className="font-mono">{driver.vehicle.license_plate}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Marca</p>
          <p>{driver.vehicle.brand}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Modelo</p>
          <p>{driver.vehicle.model}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Año</p>
          <p>{driver.vehicle.year}</p>
        </div>
      </CardContent>
    </Card>
  );
}

