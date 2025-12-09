# Docker - Mandao Service Driver Front

Este documento describe cómo construir y ejecutar la aplicación usando Docker.

## Variables de Entorno

Las siguientes variables de entorno deben ser pasadas durante la construcción de la imagen usando `--build-arg`:

### Variables Requeridas

- `NEXT_PUBLIC_API_URL`: URL base de la API backend (ej: `https://api.example.com`)
- `NEXT_PUBLIC_API_MODE`: Modo de la API (`api` o `mock`). Por defecto: `api`
- `NEXT_PUBLIC_APP_URL`: URL base de la aplicación (ej: `https://driver.example.com`). Por defecto: `http://localhost:3000`

**Importante**: Las variables `NEXT_PUBLIC_*` se inyectan en tiempo de build, no en runtime. Esto significa que deben pasarse al construir la imagen.

## Construcción de la Imagen

### Construcción Básica

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_API_MODE=api \
  --build-arg NEXT_PUBLIC_APP_URL=https://driver.example.com \
  -t mandao-driver-front:latest .
```

### Construcción con Variables desde Archivo

Puedes crear un archivo `.env.build` con las variables:

```bash
# .env.build
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_API_MODE=api
NEXT_PUBLIC_APP_URL=https://driver.example.com
```

Y luego construir usando:

```bash
docker build \
  $(cat .env.build | sed 's/^/--build-arg /' | tr '\n' ' ') \
  -t mandao-driver-front:latest .
```

## Ejecución del Contenedor

### Ejecución Básica

```bash
docker run -d \
  --name mandao-driver-front \
  -p 3000:3000 \
  mandao-driver-front:latest
```

### Ejecución con Docker Compose

Crea un archivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  driver-front:
    build:
      context: .
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL:-http://localhost:3001}
        NEXT_PUBLIC_API_MODE: ${NEXT_PUBLIC_API_MODE:-api}
        NEXT_PUBLIC_APP_URL: ${NEXT_PUBLIC_APP_URL:-http://localhost:3000}
    image: mandao-driver-front:latest
    container_name: mandao-driver-front
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode >= 200 && r.statusCode < 400 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Y ejecuta:

```bash
docker-compose up -d
```

## Características del Dockerfile

- **Multi-stage build**: Optimiza el tamaño de la imagen final
- **Standalone output**: Next.js genera una versión optimizada con solo las dependencias necesarias
- **Usuario no-root**: Ejecuta como usuario `nextjs` para mayor seguridad
- **Health check**: Verifica que el servidor esté respondiendo correctamente
- **Caché de dependencias**: Optimiza builds subsecuentes

## Verificación

### Verificar que el contenedor está corriendo

```bash
docker ps | grep mandao-driver-front
```

### Ver logs del contenedor

```bash
docker logs -f mandao-driver-front
```

### Verificar health check

```bash
docker inspect --format='{{.State.Health.Status}}' mandao-driver-front
```

### Acceder a la aplicación

Abre tu navegador en: `http://localhost:3000`

## Troubleshooting

### La aplicación no inicia

1. Verifica los logs: `docker logs mandao-driver-front`
2. Verifica que el puerto 3000 no esté en uso: `lsof -i :3000`
3. Verifica que las variables de entorno fueron pasadas correctamente durante el build

### Error de conexión a la API

1. Verifica que `NEXT_PUBLIC_API_URL` fue configurada correctamente durante el build
2. Si cambias la URL de la API, necesitas reconstruir la imagen (las variables `NEXT_PUBLIC_*` se inyectan en build time)

### Imagen muy grande

El Dockerfile usa multi-stage build y standalone output para minimizar el tamaño. Si necesitas optimizar más:

1. Usa `.dockerignore` para excluir archivos innecesarios
2. Considera usar `node:20-alpine` (ya está en uso)
3. Limpia el caché de Docker: `docker builder prune`

## Producción

Para producción, asegúrate de:

1. ✅ Usar variables de entorno reales (no localhost)
2. ✅ Configurar HTTPS (usando un reverse proxy como nginx)
3. ✅ Configurar un sistema de monitoreo
4. ✅ Configurar backups y logs
5. ✅ Usar un registry de imágenes (Docker Hub, AWS ECR, etc.)

### Ejemplo para Producción

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.mandao.com \
  --build-arg NEXT_PUBLIC_API_MODE=api \
  --build-arg NEXT_PUBLIC_APP_URL=https://driver.mandao.com \
  -t mandao-driver-front:latest \
  -t mandao-driver-front:v1.0.0 \
  .

# Tag para registry
docker tag mandao-driver-front:latest registry.example.com/mandao-driver-front:latest

# Push al registry
docker push registry.example.com/mandao-driver-front:latest
```

