import React, { useState, useEffect, createContext } from 'react';
import firebase from '@/lib/firebase';
import { User } from '@/lib/types';

type ContextProps = [User | null, boolean];

export const UserContext = createContext<ContextProps>([null, true]);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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

export default UserProvider;
