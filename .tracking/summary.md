# Summary - Driver Assignment System

## Proyecto: mandao-service-driver-app (React Native)

## Progreso General
- **Total tareas:** 0/25 completadas
- **Fase 5.1 (Init):** 0/3
- **Fase 5.2 (Auth):** 0/6
- **Fase 5.3 (Orders):** 0/7
- **Fase 5.4 (Location):** 0/5
- **Fase 5.5 (Profile):** 0/4

## Estado Actual
🔴 No iniciado

## Última Actualización
- **Fecha:** [Pendiente]
- **Descripción:** [Pendiente]

---

## Historial de Cambios

### [Fecha] - Inicialización
- Creado sistema de tracking
- Plan definido con 25 tareas

---

## Notas Técnicas

### Stack Tecnológico
- **Framework:** React Native 0.81 (CLI, no Expo)
- **Navegación:** @react-navigation/native
- **GPS:** react-native-geolocation-service
- **WebSocket:** socket.io-client
- **Data Fetching:** @tanstack/react-query
- **Storage:** @react-native-async-storage/async-storage

### Servicio de Ubicación
- Permisos foreground/background
- Sampling inteligente:
  - IN_TRANSIT: cada 15 segundos
  - AVAILABLE: cada 60 segundos
  - OFFLINE: no enviar
- Batching para optimizar batería
- Reconexión automática WebSocket
- Queue offline con sync

### Estructura de Carpetas
```
mandao-service-driver-app/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   └── profile/
│   ├── components/
│   ├── services/
│   │   ├── api/
│   │   ├── location/
│   │   └── websocket/
│   ├── hooks/
│   ├── contexts/
│   ├── navigation/
│   └── types/
├── android/
├── ios/
└── package.json
```

---

## Bloqueantes
- Ninguno (puede desarrollarse en paralelo con API usando mocks)

## Decisiones Técnicas
- React Native CLI (no Expo) para control total sobre módulos nativos
- Background location requiere permisos especiales en iOS/Android
- WebSocket con reconexión exponential backoff

