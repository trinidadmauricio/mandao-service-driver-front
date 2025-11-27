/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '../use-auth';
import { isMockMode } from '@/lib/api/mock';
import { mockLogin } from '@/lib/api/mock/mock-auth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/api/mock', () => ({
  isMockMode: jest.fn(),
}));

jest.mock('@/lib/api/mock/mock-auth', () => ({
  mockLogin: jest.fn(),
}));

jest.mock('@/lib/api/client', () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

describe('useAuth', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Cookies.remove('user');
    Cookies.remove('access_token');
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should initialize with no user when no cookies are present', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.role).toBeNull();
  });

  it('should load user from cookies on mount', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'driver@example.com',
      first_name: 'Juan',
      last_name: 'Pérez',
      role: 'DRIVER' as const,
      email_verified: true,
    };

    Cookies.set('user', JSON.stringify(mockUser));
    Cookies.set('access_token', 'test-token');

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.role).toBe('DRIVER');
  });

  it('should reject non-DRIVER users from cookies', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'admin@example.com',
      first_name: 'Admin',
      last_name: 'User',
      role: 'OWNER' as const,
      email_verified: true,
    };

    Cookies.set('user', JSON.stringify(mockUser));
    Cookies.set('access_token', 'test-token');

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(Cookies.get('user')).toBeUndefined();
  });

  it('should login successfully in mock mode', async () => {
    (isMockMode as jest.Mock).mockReturnValue(true);
    (mockLogin as jest.Mock).mockResolvedValue({
      access_token: 'mock-token',
      user: {
        id: 'driver-1',
        email: 'driver@example.com',
        first_name: 'Juan',
        last_name: 'Pérez',
        role: 'DRIVER',
        email_verified: true,
      },
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.login('driver@example.com', 'password123');

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
    expect(Cookies.get('access_token')).toBeDefined();
    expect(Cookies.get('user')).toBeDefined();
  });

  it('should logout and clear cookies', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'driver@example.com',
      first_name: 'Juan',
      last_name: 'Pérez',
      role: 'DRIVER' as const,
      email_verified: true,
    };

    Cookies.set('user', JSON.stringify(mockUser));
    Cookies.set('access_token', 'test-token');

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    result.current.logout();

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(Cookies.get('user')).toBeUndefined();
    expect(Cookies.get('access_token')).toBeUndefined();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});

