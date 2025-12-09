/**
 * Definición de endpoints de la API
 */

const API_BASE = '/api/v1';

export const endpoints = {
  // Auth
  auth: {
    login: `${API_BASE}/auth/login`,
    refresh: `${API_BASE}/auth/refresh`,
  },
  // Orders
  orders: {
    list: `${API_BASE}/orders`,
    get: (id: string) => `${API_BASE}/orders/${id}`,
    update: (id: string) => `${API_BASE}/orders/${id}`,
  },
  // Drivers
  drivers: {
    get: (id: string) => `${API_BASE}/drivers/${id}`,
    update: (id: string) => `${API_BASE}/drivers/${id}`,
  },
  // Reports
  reports: {
    drivers: `${API_BASE}/reports/drivers`,
  },
} as const;

