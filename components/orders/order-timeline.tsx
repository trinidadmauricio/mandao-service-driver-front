'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Order } from '@/types/api';

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const history = order.order_status_history || [];

  if (history.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No hay historial de estados disponible
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list" aria-label="Historial de estados de la orden">
      {history.map((item, index) => {
        const isLast = index === history.length - 1;
        return (
          <div key={item.id} className="flex gap-4" role="listitem">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isLast ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
                aria-hidden="true"
              >
                {isLast ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              {!isLast && <div className="h-full w-0.5 bg-border mt-2" aria-hidden="true" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {item.from_status} → {item.to_status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(item.changed_at), "PPpp", { locale: es })}
              </p>
              {item.notes && (
                <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

