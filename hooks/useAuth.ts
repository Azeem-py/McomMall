'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/redux/store';
import { clearAuth, setAuth } from '@/lib/redux/authSlice';
import { UserRole } from '@/service/auth/types';

interface AuthInfo {
  isAuthenticated: boolean;
  userName: string | null;
  logout: () => void;
}

export const useAuth = (): AuthInfo => {
  const dispatch = useDispatch();
  const { access_token, user_name } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!access_token) {
      const accessToken = Cookies.get('access');
      const name = localStorage.getItem('user-name');
      const role = localStorage.getItem('user-type') as UserRole;

      if (accessToken && name && role) {
        dispatch(setAuth({ access_token: accessToken, user_name: name, user_role: role }));
      }
    }
  }, [access_token, dispatch]);

  const logout = () => {
    dispatch(clearAuth());
    Cookies.remove('access');
    Cookies.remove('refresh');
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-type');
    router.push('/');
    router.refresh();
  };

  return { isAuthenticated: !!access_token, userName: user_name, logout };
};
