'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthInfo {
  isAuthenticated: boolean;
  userName: string | null;
  logout: () => void;
}

export const useAuth = (): AuthInfo => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('access');
    const name = localStorage.getItem('user-name');

    if (accessToken && name) {
      setIsAuthenticated(true);
      setUserName(name);
    } else {
      setIsAuthenticated(false);
      setUserName(null);
    }
  }, []);

  const logout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-type');
    setIsAuthenticated(false);
    setUserName(null);
    router.push('/');
    router.refresh();
  };

  return { isAuthenticated, userName, logout };
};
