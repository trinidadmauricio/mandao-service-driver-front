import { MetricsCards } from '@/components/dashboard/metrics-cards';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Resumen de tus actividades y métricas del día
        </p>
      </div>

      <MetricsCards />
    </div>
  );
}

