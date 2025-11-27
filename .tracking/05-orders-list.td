# Feature: Lista de Órdenes

## Estado: Completado

## Branch: feature/orders-list

## Tareas

- [x] Crear lib/hooks/use-orders.ts con hooks para órdenes
- [x] Actualizar lib/api/mock/mock-orders.ts con más datos y paginación
- [x] Crear components/orders/order-status-badge.tsx accesible con iconos
- [x] Crear components/orders/order-list.tsx con TanStack Table
- [x] Implementar filtros (status, búsqueda con debounce)
- [x] Implementar paginación server-side
- [x] Crear app/(dashboard)/orders/page.tsx
- [x] Implementar modo mock y API
- [x] Crear components/orders/__tests__/order-status-badge.test.tsx
- [x] Asegurar responsive design
- [x] Verificar que compile y funcione correctamente

## Notas
- Usar TanStack Table para la tabla
- Debounce en búsqueda (300ms)
- Paginación server-side
- Filtros por status
- Badge de status con colores e iconos

