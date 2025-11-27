# Feature: Autenticación

## Estado: Completado

## Branch: feature/authentication

## Tareas

- [x] Crear lib/api/endpoints.ts con endpoints de autenticación
- [x] Crear lib/api/client.ts con Axios client e interceptors
- [x] Actualizar lib/api/mock/mock-auth.ts con implementación completa
- [x] Crear lib/hooks/use-auth.ts con hook de autenticación
- [x] Crear components/auth/protected-route.tsx
- [x] Crear components/auth/login-form.tsx con RHF+Zod, accesibilidad
- [x] Crear app/(auth)/login/page.tsx
- [x] Crear app/providers.tsx con TanStack Query provider
- [x] Actualizar app/layout.tsx para incluir providers
- [x] Crear lib/hooks/__tests__/use-auth.test.ts
- [x] Crear components/auth/__tests__/login-form.test.tsx
- [x] Crear components/auth/__tests__/protected-route.test.tsx
- [x] Verificar accesibilidad (ARIA, keyboard nav)
- [x] Verificar que compile y funcione correctamente

## Notas
- Implementar modo mock y API usando factory pattern
- Asegurar accesibilidad completa (ARIA labels, keyboard navigation)
- Validación con Zod en el formulario de login
- Solo usuarios con rol DRIVER pueden acceder

