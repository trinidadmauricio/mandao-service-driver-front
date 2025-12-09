import { OrderList } from '@/components/orders/order-list';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Órdenes</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona y visualiza todas tus órdenes asignadas
        </p>
      </div>

      <OrderList />
    </div>
  );
}

