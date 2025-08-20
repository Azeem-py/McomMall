'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/service/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/');
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
