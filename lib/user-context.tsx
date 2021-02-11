import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/use-user';
import firebase from '@/lib/firebase';
import type { FunctionComponent } from 'react';

type ContextProps = [firebase.User | null, boolean];

export const UserContext = createContext<ContextProps>([null, true]);

export const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={[user, loading]}>
      {children}
    </UserContext.Provider>
  );
};

export const SignInRequired = () => {
  const [user, loading] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/sign-in');
    }
  }, [user, loading]);

  return null;
};
