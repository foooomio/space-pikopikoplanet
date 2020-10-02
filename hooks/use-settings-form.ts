import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import {
  fetchUserData,
  fetchUserDataByUserId,
  saveUserData,
} from '@/lib/database';
import type { ChangeEvent } from 'react';
import type { UserData } from '@/lib/types';

const validateUserId = async (
  userId: string,
  uid: string
): Promise<string | null> => {
  if (userId.length === 0) {
    return 'IDが入力されていません。';
  }
  if (/[^0-9A-Za-z-_]/.test(userId)) {
    return 'IDに使用できない文字が含まれています。';
  }
  const userData = await fetchUserDataByUserId(userId);
  if (userData && userData.uid !== uid) {
    return 'IDが他の人に使用されています。';
  }
  return null;
};

const validateUserName = (userName: string): string | null => {
  if (userName.length === 0) {
    return '名前が入力されていません。';
  }
  return null;
};

const initialState = {
  uid: '',
  userId: '',
  userName: '',
  website: '',
  facebookId: '',
  twitterId: '',
  gitHubId: '',
};

export const useSettingsForm = () => {
  const [user] = useUser();

  const [form, setForm] = useState<UserData>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    fetchUserData(user.uid).then((userData) => {
      if (userData) {
        setForm(userData);
      }
      setLoading(false);
    });
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setProcessing(true);
    setDone(false);

    const newErrors = [
      await validateUserId(form.userId, user!.uid),
      validateUserName(form.userName),
    ].filter((e): e is string => e !== null);

    if (newErrors.length === 0) {
      await saveUserData({ ...form, uid: user!.uid });
      setDone(true);
    }

    setErrors(newErrors);
    setProcessing(false);
  };

  return {
    form,
    loading,
    errors,
    processing,
    done,
    handleChange,
    handleSubmit,
  };
};
