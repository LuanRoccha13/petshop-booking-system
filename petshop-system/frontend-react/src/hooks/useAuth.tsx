import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthResponse } from '../types/auth';
import { api } from '../services/api';

interface AuthContextValue {
  token: string | null;
  refreshToken: string | null;
  email: string | null;
  expiresAt: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStorageValue(key: string) {
  return localStorage.getItem(key);
}

function setStorageValue(key: string, value: string | null) {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStorageValue('token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => getStorageValue('refreshToken'));
  const [email, setEmail] = useState<string | null>(() => getStorageValue('email'));
  const [expiresAt, setExpiresAt] = useState<number | null>(() => {
    const value = getStorageValue('expiresAt');
    return value ? Number(value) : null;
  });

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    setStorageValue('token', token);
    setStorageValue('refreshToken', refreshToken);
    setStorageValue('email', email);
    setStorageValue('expiresAt', expiresAt !== null ? String(expiresAt) : null);
  }, [token, refreshToken, email, expiresAt]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/api/auth/login', { email, password });
    const data = response.data;
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    setEmail(data.email);
    setExpiresAt(data.expiresAt);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        await api.post('/api/auth/logout');
      } catch (error) {
        // ignore logout errors and clear local state anyway
      }
    }

    setToken(null);
    setRefreshToken(null);
    setEmail(null);
    setExpiresAt(null);
    delete api.defaults.headers.common.Authorization;
  }, [token]);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      await logout();
      return;
    }

    const response = await api.post<AuthResponse>('/api/auth/refresh', { refreshToken });
    const data = response.data;
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    setEmail(data.email);
    setExpiresAt(data.expiresAt);
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  }, [logout, refreshToken]);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    const refreshDelay = expiresAt - Date.now() - 60_000;
    if (refreshDelay <= 0) {
      refreshAccessToken().catch(logout);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      refreshAccessToken().catch(logout);
    }, refreshDelay);

    return () => window.clearTimeout(timeoutId);
  }, [expiresAt, refreshAccessToken, logout]);

  const value = useMemo(
    () => ({ token, refreshToken, email, expiresAt, login, logout, refreshAccessToken }),
    [token, refreshToken, email, expiresAt, login, logout, refreshAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
