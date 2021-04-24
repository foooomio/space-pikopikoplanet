import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/use-user';

export const useSignInRequired = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/sign-in');
    }
  }, [user, loading]);

  return null;
};
