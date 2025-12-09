'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { isMockMode } from '@/lib/api/mock';
import { mockLogin } from '@/lib/api/mock/mock-auth';
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { User, LoginResponse } from '@/types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: 'DRIVER' | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    role: null,
  });

  // Cargar usuario desde cookies al montar
  useEffect(() => {
    const userCookie = Cookies.get('user');
    const token = Cookies.get('access_token');

    if (userCookie && token) {
      try {
        const user = JSON.parse(userCookie) as User;
        
        // Validar que el rol sea DRIVER
        if (user.role !== 'DRIVER') {
          Cookies.remove('user');
          Cookies.remove('access_token');
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            role: null,
          });
          return;
        }

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          role: user.role,
        });
      } catch {
        Cookies.remove('user');
        Cookies.remove('access_token');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          role: null,
        });
      }
    } else {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        role: null,
      });
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        let response: { data: { data: LoginResponse } };

        if (isMockMode()) {
          const loginResponse = await mockLogin({ email, password });
          response = { data: { data: loginResponse } };
        } else {
          response = await apiClient.post<{ data: LoginResponse }>(endpoints.auth.login, {
            email,
            password,
          });
        }

        const { access_token, user: loginUser } = response.data.data;

        // Validar que el rol sea DRIVER
        if (loginUser.role !== 'DRIVER') {
          throw new Error('Only drivers can access this portal');
        }

        const user: User = {
          id: loginUser.id,
          email: loginUser.email,
          first_name: loginUser.first_name,
          last_name: loginUser.last_name,
          role: loginUser.role,
          email_verified: loginUser.email_verified,
          tenant_id: loginUser.tenant_id,
          logistics_provider_id: loginUser.logistics_provider_id,
          active: true,
        };

        // Guardar en cookies
        Cookies.set('access_token', access_token, { expires: 7, path: '/' });
        Cookies.set('user', JSON.stringify(user), { expires: 7, path: '/' });
        if (user.tenant_id) {
          Cookies.set('tenant_id', user.tenant_id, { expires: 7, path: '/' });
        }

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          role: user.role === 'DRIVER' ? 'DRIVER' : null,
        });

        router.push('/dashboard');
      } catch (error) {
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('user');
    Cookies.remove('tenant_id');

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      role: null,
    });

    router.push('/login');
  }, [router]);

  return {
    ...state,
    login,
    logout,
  };
}

