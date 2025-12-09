/**
 * Factory para obtener el cliente API (mock o real)
 * Basado en la variable de entorno NEXT_PUBLIC_API_MODE
 */

const API_MODE = process.env.NEXT_PUBLIC_API_MODE || 'mock';

export type ApiMode = 'mock' | 'api';

export function getApiMode(): ApiMode {
  return API_MODE as ApiMode;
}

export function isMockMode(): boolean {
  return getApiMode() === 'mock';
}

export function isApiMode(): boolean {
  return getApiMode() === 'api';
}

