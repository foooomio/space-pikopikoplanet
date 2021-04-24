import { useEffect } from 'react';
import useSWR from 'swr';
import gravatarUrl from 'gravatar-url';
import firebase from '@/lib/firebase';

type Auth = {
  user: firebase.User | null;
  loading: boolean;
  avatar: string;
};

const defaultAvatar = gravatarUrl('default', { default: 'mm' });

const initialData: Auth = {
  user: null,
  loading: true,
  avatar: defaultAvatar,
};

export const useUser = (): Auth => {
  const { data, mutate } = useSWR<Auth>('auth', null, { initialData });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      const avatar = user
        ? gravatarUrl(user.email!, { default: 'identicon' })
        : defaultAvatar;
      mutate({ user, loading: false, avatar });
    });
  }, []);

  return data!;
};
