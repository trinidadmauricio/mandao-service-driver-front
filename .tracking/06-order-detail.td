# Feature: Detalle de Orden

## Estado: Completado

## Branch: feature/order-detail

## Tareas

- [x] Crear components/orders/order-detail.tsx con información completa
- [x] Crear components/orders/update-status-dialog.tsx con validación de transiciones
- [x] Crear components/orders/order-timeline.tsx
- [x] Crear app/(dashboard)/orders/[id]/page.tsx
- [x] Implementar validación de transiciones de estado
- [x] Implementar modo mock y API
- [x] Asegurar accesibilidad
- [x] Verificar que compile y funcione correctamente

## Notas
- Validar transiciones permitidas: ASSIGNED→IN_TRANSIT, IN_TRANSIT→DELIVERED/FAILED/CANCELLED
- Timeline debe mostrar historial de estados
- Dialog debe tener focus trap y validación Zod

