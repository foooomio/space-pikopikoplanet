import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from '@/hooks/use-user';
import {
  fetchLikeCount,
  fetchLikedByUser,
  createLike,
  deleteLike,
  fetchUserData,
  createNotification,
  deleteNotification,
} from '@/lib/database';
import { likeId } from '@/lib/util';

export const useLikeButton = (queryId: string, queryAuthorUid: string) => {
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

  const handleLike = () => {
    createLike(user!.uid, queryId).then(() => {
      setLikeCount((count) => count! + 1);
      setLikedByUser(true);
    });

    if (user!.uid !== queryAuthorUid) {
      fetchUserData(user!.uid).then((userData) => {
        if (userData && userData.userId && userData.userName) {
          createNotification(queryAuthorUid, {
            type: 'like',
            notificationId: likeId(user!.uid, queryId),
            queryId,
            authorUid: user!.uid,
            authorId: userData.userId,
            authorName: userData.userName,
            createdAt: Date.now(),
            unread: true,
          });
        }
      });
    }
  };

  const handleUnlike = () => {
    deleteLike(user!.uid, queryId).then(() => {
      setLikeCount((count) => count! - 1);
      setLikedByUser(false);
    });

    if (user!.uid !== queryAuthorUid) {
      deleteNotification(queryAuthorUid, likeId(user!.uid, queryId));
    }
  };

  return { likeCount, likedByUser, handleLike, handleUnlike };
};
