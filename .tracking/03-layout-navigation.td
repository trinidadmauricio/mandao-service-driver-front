# Feature: Layout y Navegación

## Estado: Completado

## Branch: feature/layout-navigation

## Tareas

- [x] Instalar componentes shadcn necesarios (separator, dropdown-menu, avatar, etc.)
- [x] Crear components/layout/header.tsx con dark mode toggle, logout, accesible
- [x] Crear components/layout/sidebar.tsx responsive con mobile menu, keyboard nav
- [x] Crear app/(dashboard)/layout.tsx con ProtectedRoute
- [x] Implementar dark mode con next-themes
- [x] Asegurar accesibilidad (ARIA, keyboard navigation)
- [x] Asegurar responsive design (mobile-first)
- [x] Verificar que compile y funcione correctamente

## Notas
- Header debe tener: logo, nombre del driver, dark mode toggle, logout
- Sidebar debe tener: Dashboard, Órdenes, Perfil
- Mobile: sidebar debe ser un drawer/menu colapsable
- Dark mode debe persistir en localStorage

