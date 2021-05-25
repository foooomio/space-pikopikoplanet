import { useEffect } from 'react';
import useSWR from 'swr';
import { getUserAvatar } from '@/lib/avatar';
import firebase from '@/lib/firebase';

type Auth = {
  user: firebase.User | null;
  loading: boolean;
  avatar: string;
};

const initialData: Auth = {
  user: null,
  loading: true,
  avatar: getUserAvatar(null),
};

export const useUser = (): Auth => {
  const { data, mutate } = useSWR<Auth>('auth', null, { initialData });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      mutate({ user, loading: false, avatar: getUserAvatar(user?.email) });
    });
  }, []);

  return data!;
};
