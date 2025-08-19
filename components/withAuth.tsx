'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();
    const { access_token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!access_token) {
        router.replace('/');
      }
    }, [access_token, router]);

    if (!access_token) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
