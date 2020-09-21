import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Button } from 'semantic-ui-react';
import { useUser } from '@/lib/user-context';
import {
  fetchLikeCount,
  fetchLikedByUser,
  createLike,
  deleteLike,
} from '@/lib/database';

export default function QueryLikeButton({ queryId }) {
  const [user] = useUser();

  const [likeCount, setLikeCount] = useState(null);
  const [likedByUser, setLikedByUser] = useState(false);

  const { data: likeCountCache } = useSWR(['likeCount', queryId], () =>
    fetchLikeCount(queryId)
  );

  const { data: likedByUserCache } = useSWR(
    user ? ['likedByUser', user.uid, queryId] : null,
    () => fetchLikedByUser(user.uid, queryId)
  );

  useEffect(() => {
    if (typeof likeCountCache !== 'undefined') {
      setLikeCount(likeCountCache);
    }
  }, [likeCountCache]);

  useEffect(() => {
    if (typeof likedByUserCache !== 'undefined') {
      setLikedByUser(likedByUserCache);
    }
  }, [likedByUserCache]);

  const loading = likeCount === null;

  if (!user) {
    return (
      <Button
        basic
        icon="heart outline"
        disabled
        content={likeCount ?? 0}
        loading={loading}
      />
    );
  }

  if (likedByUser) {
    return (
      <Button
        basic
        icon="heart"
        color="red"
        content={likeCount ?? 0}
        loading={loading}
        onClick={async () => {
          await deleteLike(user.uid, queryId);
          setLikeCount((count) => count - 1);
          setLikedByUser(false);
        }}
      />
    );
  } else {
    return (
      <Button
        basic
        icon="heart outline"
        content={likeCount ?? 0}
        loading={loading}
        onClick={async () => {
          await createLike(user.uid, queryId);
          setLikeCount((count) => count + 1);
          setLikedByUser(true);
        }}
      />
    );
  }
}
