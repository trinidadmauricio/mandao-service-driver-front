'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Package, User } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Órdenes', href: '/orders', icon: Package },
  { name: 'Perfil', href: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({
    href,
    icon: Icon,
    children,
    onClick,
  }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    const isActive = pathname === href || pathname?.startsWith(href + '/');
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 border-b bg-background px-4 py-2">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Navegación</SheetTitle>
              <SheetDescription>Menú principal del portal</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4" aria-label="Navegación principal">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-background"
        aria-label="Navegación lateral"
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4 pt-16">
          <nav className="flex flex-1 flex-col gap-1" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href} icon={item.icon}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

