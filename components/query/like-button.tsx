import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Button } from 'semantic-ui-react';
import { useUser } from '@/hooks/use-user';
import {
  fetchLikeCount,
  fetchLikedByUser,
  createLike,
  deleteLike,
} from '@/lib/database';

type Props = {
  queryId: string;
};

const QueryLikeButton = ({ queryId }: Props) => {
  const [user] = useUser();

  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [likedByUser, setLikedByUser] = useState<boolean>(false);

  const { data: likeCountCache } = useSWR(['likeCount', queryId], () =>
    fetchLikeCount(queryId)
  );

  const { data: likedByUserCache } = useSWR(
    user ? ['likedByUser', user.uid, queryId] : null,
    () => fetchLikedByUser(user!.uid, queryId)
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
          setLikeCount((count) => count! - 1);
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
          setLikeCount((count) => count! + 1);
          setLikedByUser(true);
        }}
      />
    );
  }
};

export default QueryLikeButton;