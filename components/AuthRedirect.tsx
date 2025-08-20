'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/service/store/store';
import { loadAuthFromCookies } from '@/service/store/authSlice';
import { setLoginModalOpen } from '@/service/store/uiSlice';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthRedirect = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!accessToken) {
      const token = Cookies.get('access');
      if (token) {
        dispatch(loadAuthFromCookies());
      } else if (pathname.startsWith('/dashboard')) {
        router.push('/');
        dispatch(setLoginModalOpen(true));
      }
    }
  }, [accessToken, dispatch, router, pathname]);

  return null;
};

export default AuthRedirect;
