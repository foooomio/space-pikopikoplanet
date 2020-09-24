import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import {
  fetchUserData,
  fetchUserDataByUserId,
  saveUserData,
} from '@/lib/database';

const validateUserId = async (userId, uid) => {
  if (userId.length === 0) {
    return 'IDが入力されていません。';
  }
  if (/[^0-9A-Za-z-_]/.test(userId)) {
    return 'IDに使用できない文字が含まれています。';
  }
  const userData = await fetchUserDataByUserId(userId);
  if (userData.userId === userId && userData.uid !== uid) {
    return 'IDが他の人に使用されています。';
  }
  return null;
};

const validateUserName = (userName) => {
  if (userName.length === 0) {
    return '名前が入力されていません。';
  }
  return null;
};

const initialData = {
  userId: '',
  userName: '',
  website: '',
  facebookId: '',
  twitterId: '',
  gitHubId: '',
};

export const useSettingsForm = () => {
  const [user] = useUser();

  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetchUserData(user.uid).then((userData) => {
      if (userData.uid) {
        setForm(userData);
      }
      setLoading(false);
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setProcessing(true);
    setDone(false);

    const newErrors = [
      await validateUserId(form.userId, user.uid),
      validateUserName(form.userName),
    ].filter((e) => e !== null);

    if (newErrors.length === 0) {
      await saveUserData({ ...form, uid: user.uid });
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
