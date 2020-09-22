import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/use-user';
import { fetchUser, fetchQuery, saveQuery } from '@/lib/database';
import { generateId } from '@/lib/util';

const validateTitle = (title) => {
  if (title.length === 0) {
    return 'タイトルが入力されていません。';
  }
  return null;
};

const validateEndpoint = (endpoint) => {
  if (endpoint.length === 0) {
    return 'エンドポイントが入力されていません。';
  }
  return null;
};

const validateQuery = (query) => {
  if (query.length === 0) {
    return 'クエリが入力されていません。';
  }
  return null;
};

const initialState = {
  queryId: null,
  authorUid: null,
  title: '',
  endpoint: '',
  query: '',
  tags: [],
  createdAt: null,
};

export const useComposeForm = (sparqlEditor) => {
  const [user] = useUser();
  const router = useRouter();

  const [form, setForm] = useState(initialState);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState([]);

  const editId = router.query.edit;

  useEffect(() => {
    if (!editId) return;

    fetchQuery(editId).then((data) => {
      if (data) {
        setForm(data);
      } else {
        router.replace('/404');
      }
    });
  }, [editId]);

  const setTitle = (value) => {
    setForm({ ...form, title: value });
  };

  const addTag = (tag) => {
    const set = new Set(form.tags);
    set.add(tag);
    setForm({ ...form, tags: [...set] });
  };

  const deleteTag = (tag) => {
    const set = new Set(form.tags);
    set.delete(tag);
    setForm({ ...form, tags: [...set] });
  };

  const handleSubmit = async () => {
    setProcessing(true);

    const data = {
      queryId: form.queryId ?? generateId(),
      authorUid: user.uid,
      title: form.title,
      endpoint: sparqlEditor.current.endpoint(),
      query: sparqlEditor.current.query(),
      tags: form.tags,
      createdAt: form.createdAt ?? Date.now(),
      updateAt: Date.now(),
    };

    let newErrors = [
      validateTitle(data.title),
      validateEndpoint(data.endpoint),
      validateQuery(data.query),
    ];

    if (!form.authorUid) {
      const { userId, userName } = await fetchUser(user.uid);
      if (userId && userName) {
        data.authorId = userId;
        data.authorName = userName;
      } else {
        newErrors.unshift('ユーザーIDまたはユーザー名が設定されていません。');
      }
    }

    newErrors = newErrors.filter((e) => e !== null);

    if (newErrors.length === 0) {
      await saveQuery(data.queryId, data);
      location.href = `/query/${data.queryId}`;
    }

    setErrors(newErrors);
    setProcessing(false);
  };

  return {
    form,
    processing,
    errors,
    setTitle,
    addTag,
    deleteTag,
    handleSubmit,
  };
};
