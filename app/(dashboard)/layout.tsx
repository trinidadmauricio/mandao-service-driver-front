import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
            <div className="container py-6 px-4">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

