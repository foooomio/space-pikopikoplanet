import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { fetchUserData, fetchQuery, saveQuery } from '@/lib/database';
import { generateId } from '@/lib/util';
import type { RefObject, ElementRef } from 'react';
import type { Query } from '@/lib/types';
import type SparqlEditor from '@/components/sparql/editor';

const validateTitle = (title: string): string | null => {
  if (title.length === 0) {
    return 'タイトルが入力されていません。';
  }
  return null;
};

const validateEndpoint = (endpoint: string): string | null => {
  if (endpoint.length === 0) {
    return 'エンドポイントが入力されていません。';
  }
  return null;
};

const validateQuery = (query: string): string | null => {
  if (query.length === 0) {
    return 'クエリが入力されていません。';
  }
  return null;
};

const initialState = {
  queryId: null,
  authorUid: null,
  authorId: null,
  authorName: null,
  title: '',
  endpoint: '',
  query: '',
  tags: [] as string[],
  createdAt: null,
  updatedAt: null,
  forkedFrom: '',
};

export const useComposeForm = (
  editId: string | null,
  fork: { queryId: string; endpoint: string; query: string } | null,
  sparqlEditor: RefObject<ElementRef<typeof SparqlEditor>>
) => {
  const [user] = useUser();

  const [form, setForm] = useState<Query | typeof initialState>(initialState);
  const [processing, setProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!editId) return;

    fetchQuery(editId).then((data) => {
      if (data) {
        setForm(data);
      } else {
        location.href = '/404';
      }
    });
  }, []);

  useEffect(() => {
    if (!fork) return;

    setForm({
      ...form,
      endpoint: fork.endpoint,
      query: fork.query,
      forkedFrom: fork.queryId,
    });
  }, []);

  const setTitle = (value: string) => {
    setForm({ ...form, title: value });
  };

  const addTag = (tag: string) => {
    const set = new Set(form.tags);
    set.add(tag);
    setForm({ ...form, tags: [...set] });
  };

  const deleteTag = (tag: string) => {
    const set = new Set(form.tags);
    set.delete(tag);
    setForm({ ...form, tags: [...set] });
  };

  const handleSubmit = async () => {
    setProcessing(true);

    const data: Query = {
      queryId: form.queryId ?? generateId(),
      authorUid: user!.uid,
      authorId: form.authorId ?? '',
      authorName: form.authorName ?? '',
      title: form.title,
      endpoint: sparqlEditor.current!.endpoint(),
      query: sparqlEditor.current!.query(),
      tags: form.tags,
      createdAt: form.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    };

    if (form.forkedFrom) {
      data.forkedFrom = form.forkedFrom;
    }

    const newErrors = [
      validateTitle(data.title),
      validateEndpoint(data.endpoint),
      validateQuery(data.query),
    ].filter((e): e is string => e !== null);

    if (!form.authorUid) {
      const userData = await fetchUserData(user!.uid);
      if (userData && userData.userId && userData.userName) {
        data.authorId = userData.userId;
        data.authorName = userData.userName;
      } else {
        newErrors.unshift('ユーザーIDまたはユーザー名が設定されていません。');
      }
    }

    if (newErrors.length === 0) {
      await saveQuery(data);
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
