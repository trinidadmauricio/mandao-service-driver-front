/**
 * Mock data para autenticación
 */

import type { LoginResponse } from '@/types/api';

export interface MockLoginRequest {
  email: string;
  password: string;
}

export const mockLogin = async (credentials: MockLoginRequest): Promise<LoginResponse> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Credenciales mock válidas
  if (credentials.email === 'driver@example.com' && credentials.password === 'password123') {
    return {
      access_token: 'mock_access_token_' + Date.now(),
      user: {
        id: 'mock-driver-id-123',
        email: 'driver@example.com',
        first_name: 'Juan',
        last_name: 'Pérez',
        role: 'DRIVER',
        email_verified: true,
      },
    };
  }

  throw new Error('Invalid credentials');
};

