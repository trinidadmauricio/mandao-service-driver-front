# Plan: Portal Driver Frontend - Desarrollo por Features

## Objetivo

Crear un portal web para drivers en `mandao-service-driver-front` organizado por features, cada una en su branch con archivos de tareas trackeables en `.tracking/`, incluyendo sistema mock/API para desarrollo y unit tests.

## Estrategia de Desarrollo

### Organización por Features

- Cada feature se desarrolla en un **branch separado** (`feature/[nombre]`)
- Cada feature tiene un archivo `.td` en `.tracking/` con tareas marcables
- Commits incrementales por tarea o grupo lógico
- Push al remoto después de cada feature completa

### Comandos Oficiales

- **Next.js:** `npx create-next-app@latest` (no crear estructura manual)
- **shadcn/ui:** `npx shadcn@latest add [component]` (no copiar componentes manualmente)
- **Tailwind:** Configuración automática con Next.js
- **Jest:** `npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`
- Seguir estructura generada por Next.js App Router

### Stack Tecnológico

**Core:**

- Next.js 15+ (App Router) - `/websites/nextjs` o `/vercel/next.js`
- React 19+
- TypeScript 5.3+

**UI:**

- shadcn/ui (última versión) - `/shadcn-ui/ui` o `/websites/ui_shadcn`
- Tailwind CSS 4+ - `/websites/tailwindcss`
- Radix UI (dependencia de shadcn)
- Lucide React

**Data & State:**

- TanStack Query 5+
- React Hook Form 7+
- Zod 3.22+

**HTTP:**

- Axios
- js-cookie

**Charts:**

- Recharts

**Testing:**

- Jest con next/jest
- React Testing Library
- @testing-library/user-event
- @testing-library/jest-dom

## Sistema Mock/API

### Configuración

Variable de entorno `NEXT_PUBLIC_API_MODE`:

- `mock` - Usar datos dummy (desarrollo sin backend)
- `api` - Usar API real (producción/integración)

### Estructura

```
lib/
├── api/
│   ├── client.ts              # Cliente Axios (solo en modo API)
│   ├── endpoints.ts           # Endpoints de la API
│   └── mock/
│       ├── index.ts           # Factory que retorna mock o API client
│       ├── mock-auth.ts       # Datos mock de autenticación
│       ├── mock-orders.ts     # Datos mock de órdenes
│       ├── mock-driver.ts     # Datos mock de driver
│       └── mock-metrics.ts    # Datos mock de métricas
```

### Implementación

- Interfaces comunes para respuestas (mock y API mismo formato)
- Factory pattern: `getApiClient()` retorna mock client o real según `NEXT_PUBLIC_API_MODE`
- Hooks usan cliente abstracto sin saber si es mock o API
- Datos mock realistas cubriendo todos los casos (éxito, error, estados)

## Endpoints de la API Identificados

### Autenticación

- `POST /api/v1/auth/login` - Login con email/password
  - Body: `{ email, password }`
  - Response: `{ access_token, user: { id, email, first_name, last_name, role, email_verified } }`

### Órdenes

- `GET /api/v1/orders?driver_id={id}&status={status}&page={page}&limit={limit}&search={search}&start_date={date}&end_date={date}`
  - Listar órdenes del driver con filtros y paginación
  - Response: `{ data: Order[], total, page, limit, totalPages }`
- `GET /api/v1/orders/:id` - Obtener detalle de orden
  - Response: `{ data: Order }` (con order_drivers, order_branches, order_summary_totals, etc.)
- `PATCH /api/v1/orders/:id` - Actualizar status de orden
  - Body: `{ to_status, notes?, cancellation_reason? }`
  - Transiciones permitidas para drivers: ASSIGNED→IN_TRANSIT, IN_TRANSIT→DELIVERED/FAILED/CANCELLED

### Perfil del Driver

- `GET /api/v1/drivers/:id` - Obtener perfil del driver
  - Response: `{ data: Driver }` (con vehicle, logistics_provider, etc.)
- `PATCH /api/v1/drivers/:id` - Actualizar perfil del driver
  - Body: `{ ...campos editables }`

### Reportes/Métricas

- `GET /api/v1/reports/drivers?driver_id={id}&start_date={date}&end_date={date}`
  - Reporte de métricas del driver
  - Response: `{ data: { total_orders, completed, revenue, avg_rating, ... } }`

## Features y Branches

### Feature 1: Setup Inicial del Proyecto

**Branch:** `feature/setup-project`

**Archivo de tareas:** `.tracking/01-setup-project.td`

**Objetivo:** Inicializar proyecto Next.js con todas las dependencias, configuraciones base, Jest y estructura mock/API.

**Comandos principales:**

```bash
# Inicializar Next.js
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Inicializar shadcn/ui
npx shadcn@latest init

# Instalar dependencias
npm install @tanstack/react-query axios js-cookie zod react-hook-form @hookform/resolvers recharts @tanstack/react-table date-fns currency.js

# Instalar dependencias de testing
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

**Archivos clave:**

- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.ts`
- `jest.config.js`
- `jest.setup.js`
- `.env.local` (con `NEXT_PUBLIC_API_MODE=mock`)
- `lib/api/mock/index.ts` (factory)
- `lib/api/mock/mock-auth.ts`
- `lib/api/mock/mock-orders.ts`
- `lib/api/mock/mock-driver.ts`
- `lib/api/mock/mock-metrics.ts`

### Feature 2: Autenticación

**Branch:** `feature/authentication`

**Archivo de tareas:** `.tracking/02-authentication.td`

**Objetivo:** Implementar login, protected routes, API client con modo mock/API, hooks de autenticación y unit tests.

**Archivos principales:**

- `app/(auth)/login/page.tsx`
- `components/auth/login-form.tsx`
- `components/auth/protected-route.tsx`
- `lib/hooks/use-auth.ts`
- `lib/api/client.ts`
- `lib/api/endpoints.ts`
- `lib/api/mock/mock-auth.ts` (completar)
- `types/api.ts`
- `lib/hooks/__tests__/use-auth.test.ts`
- `components/auth/__tests__/login-form.test.tsx`
- `components/auth/__tests__/protected-route.test.tsx`

### Feature 3: Layout y Navegación

**Branch:** `feature/layout-navigation`

**Archivo de tareas:** `.tracking/03-layout-navigation.td`

**Objetivo:** Crear layout del dashboard con header, sidebar y navegación.

**Archivos principales:**

- `app/(dashboard)/layout.tsx`
- `components/layout/header.tsx`
- `components/layout/sidebar.tsx`

### Feature 4: Dashboard con Métricas

**Branch:** `feature/dashboard-metrics`

**Archivo de tareas:** `.tracking/04-dashboard-metrics.td`

**Objetivo:** Dashboard con métricas básicas (órdenes del día, entregas, ingresos) con modo mock/API y unit tests.

**Archivos principales:**

- `app/(dashboard)/dashboard/page.tsx`
- `components/dashboard/metrics-cards.tsx`
- `lib/hooks/use-metrics.ts`
- `lib/api/mock/mock-metrics.ts` (completar)
- `lib/hooks/__tests__/use-metrics.test.ts`
- `components/dashboard/__tests__/metrics-cards.test.tsx`

### Feature 5: Lista de Órdenes

**Branch:** `feature/orders-list`

**Archivo de tareas:** `.tracking/05-orders-list.td`

**Objetivo:** Página de lista de órdenes con tabla, filtros, paginación, modo mock/API y unit tests.

**Archivos principales:**

- `app/(dashboard)/orders/page.tsx`
- `components/orders/order-list.tsx`
- `components/orders/order-status-badge.tsx`
- `lib/hooks/use-orders.ts`
- `lib/api/mock/mock-orders.ts` (completar)
- `lib/hooks/__tests__/use-orders.test.ts`
- `components/orders/__tests__/order-list.test.tsx`
- `components/orders/__tests__/order-status-badge.test.tsx`

### Feature 6: Detalle de Orden

**Branch:** `feature/order-detail`

**Archivo de tareas:** `.tracking/06-order-detail.td`

**Objetivo:** Página de detalle de orden con información completa, cambio de status, modo mock/API y unit tests.

**Archivos principales:**

- `app/(dashboard)/orders/[id]/page.tsx`
- `components/orders/order-detail.tsx`
- `components/orders/update-status-dialog.tsx`
- `components/orders/order-timeline.tsx`
- `components/orders/__tests__/order-detail.test.tsx`
- `components/orders/__tests__/update-status-dialog.test.tsx`
- `components/orders/__tests__/order-timeline.test.tsx`

### Feature 7: Perfil del Driver

**Branch:** `feature/driver-profile`

**Archivo de tareas:** `.tracking/07-driver-profile.td`

**Objetivo:** Página de perfil completo con datos personales, vehículo, documentos, estadísticas, modo mock/API y unit tests.

**Archivos principales:**

- `app/(dashboard)/profile/page.tsx`
- `components/profile/profile-form.tsx`
- `components/profile/vehicle-info.tsx`
- `components/profile/documents-section.tsx`
- `components/profile/profile-stats.tsx`
- `lib/hooks/use-driver.ts`
- `lib/api/mock/mock-driver.ts` (completar)
- `lib/hooks/__tests__/use-driver.test.ts`
- `components/profile/__tests__/profile-form.test.tsx`

### Feature 8: Polishing y Optimizaciones

**Branch:** `feature/polish-optimizations`

**Archivo de tareas:** `.tracking/08-polish-optimizations.td`

**Objetivo:** Loading states, error handling, empty states, responsive design, accesibilidad y tests de integración.

## Estructura de Archivos de Tareas (.td)

Cada archivo en `.tracking/` seguirá este formato:

```markdown
# Feature: [Nombre de la Feature]

## Estado: [Pendiente/En Progreso/Completado]

## Branch: feature/[nombre-feature]

## Tareas

- [ ] Tarea 1 - Descripción detallada
- [x] Tarea 2 - Tarea completada
- [ ] Tarea 3 - Descripción detallada

## Notas
[Notas adicionales sobre la implementación]
```

## Flujo de Trabajo por Feature

1. **Crear branch:** `git checkout -b feature/[nombre-feature]`
2. **Crear archivo de tareas:** `.tracking/[numero]-[nombre-feature].td`
3. **Desarrollar feature:** Implementar todas las tareas del archivo `.td`
4. **Marcar tareas completadas:** Actualizar `.tracking/[feature].td` con `[x]`
5. **Commits incrementales:** Hacer commits por cada tarea o grupo lógico

   - `git add .`
   - `git commit -m "feat: [descripción de la tarea]"`

6. **Push al remoto:** `git push origin feature/[nombre-feature]`
7. **Actualizar estado:** Marcar feature como "Completado" en el archivo `.td`

## Unit Tests

### Configuración Jest

- Usar `next/jest` para configuración
- Coverage threshold: 80% (branches, functions, lines, statements)
- Test environment: `jest-environment-jsdom`
- Setup file: `jest.setup.js`

### Estructura de Tests

```
src/
├── components/
│   └── [feature]/
│       └── __tests__/
│           └── [component].test.tsx
├── lib/
│   └── hooks/
│       └── __tests__/
│           └── [hook].test.ts
└── lib/
    └── utils/
        └── __tests__/
            └── [util].test.ts
```

### Tests por Feature

**Feature 2 - Autenticación:**

- `use-auth.test.ts` - Hook de autenticación (mock y API)
- `login-form.test.tsx` - Formulario de login
- `protected-route.test.tsx` - Protected route component

**Feature 4 - Dashboard:**

- `use-metrics.test.ts` - Hook de métricas (mock y API)
- `metrics-cards.test.tsx` - Cards de métricas

**Feature 5 - Órdenes:**

- `use-orders.test.ts` - Hooks de órdenes (mock y API)
- `order-list.test.tsx` - Lista de órdenes
- `order-status-badge.test.tsx` - Badge de status

**Feature 6 - Detalle Orden:**

- `order-detail.test.tsx` - Detalle de orden
- `update-status-dialog.test.tsx` - Dialog de cambio de status
- `order-timeline.test.tsx` - Timeline de estados

**Feature 7 - Perfil:**

- `use-driver.test.ts` - Hook de driver (mock y API)
- `profile-form.test.tsx` - Formulario de perfil

**Utils:**

- `date.test.ts` - Utilidades de fecha
- `currency.test.ts` - Utilidades de moneda

### Comandos de Testing

```bash
npm test                    # Ejecutar tests
npm test:watch             # Watch mode
npm test:coverage          # Con coverage
```

## Consideraciones de Seguridad

1. **Validación de Rol:** Solo usuarios con rol `DRIVER` pueden acceder
2. **Filtrado Automático:** Todas las queries de órdenes deben filtrar por `driver_id` del usuario autenticado
3. **Validación de Transiciones:** El frontend debe validar transiciones permitidas antes de enviar
4. **Tokens:** Guardar en cookies con httpOnly si es posible

## Documentación de Referencia (Context7)

- **Next.js:** `/websites/nextjs` o `/vercel/next.js`
- **shadcn/ui:** `/shadcn-ui/ui` o `/websites/ui_shadcn`
- **Tailwind CSS:** `/websites/tailwindcss` o `/tailwindlabs/tailwindcss.com`

Usar `mcp_context7_get-library-docs` para obtener documentación actualizada durante el desarrollo.