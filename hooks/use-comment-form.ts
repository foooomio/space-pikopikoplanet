import { useState } from 'react';
import useSWR from 'swr';
import { useUser } from '@/hooks/use-user';
import {
  fetchCommentList,
  saveComment,
  deleteComment,
  fetchUserData,
} from '@/lib/database';
import { generateId } from '@/lib/util';
import type { Comment } from '@/lib/types';

const validateText = (text: string): string | null => {
  if (text.length === 0) {
    return 'コメントが入力されていません。';
  }
  return null;
};

export const useCommentForm = (queryId: string) => {
  const [user] = useUser();

  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  const { data: comments, error, mutate } = useSWR(['comments', queryId], () =>
    fetchCommentList(queryId)
  );

  if (error) {
    console.error(error);
  }

  const handleSubmit = async () => {
    setProcessing(true);

    const data: Comment = {
      commentId: generateId(),
      queryId,
      authorUid: user!.uid,
      authorId: '',
      authorName: '',
      text,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newErrors = [validateText(data.text)].filter(
      (e): e is string => e !== null
    );

    const userData = await fetchUserData(user!.uid);
    if (userData && userData.userId && userData.userName) {
      data.authorId = userData.userId;
      data.authorName = userData.userName;
    } else {
      newErrors.unshift('ユーザーIDまたはユーザー名が設定されていません。');
    }

    if (newErrors.length === 0) {
      await saveComment(data);
      setText('');
      mutate();
    }

    setErrors(newErrors);
    setProcessing(false);
  };

  const handleDelete = async (commentId: string) => {
    await deleteComment(queryId, commentId);
    mutate();
  };

  return {
    comments,
    errors,
    processing,
    text,
    setText,
    handleSubmit,
    handleDelete,
  };
};
