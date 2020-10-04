import { db } from '@/lib/firebase';
import { likeId } from '@/lib/util';
import type {
  UserData,
  Query,
  Comment,
  Notification,
  SearchOptions,
  QueryWithLikedAt,
} from '@/lib/types';

export const fetchUserData = (uid: string): Promise<UserData | null> => {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => (doc.data() as UserData) ?? null);
};

export const fetchUserDataByUserId = (
  userId: string
): Promise<UserData | null> => {
  return db
    .collection('users')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) =>
      querySnapshot.empty ? null : (querySnapshot.docs[0].data() as UserData)
    );
};

const saveUserDataInUsers = (userData: UserData): Promise<void> => {
  return db.collection('users').doc(userData.uid).set(userData);
};

const updateUserDataInQueries = (userData: UserData): Promise<void> => {
  return db
    .collection('queries')
    .where('authorUid', '==', userData.uid)
    .get()
    .then((querySnapshot) => {
      const batch = db.batch();
      querySnapshot.forEach((doc) =>
        batch.update(doc.ref, {
          authorId: userData.userId,
          authorName: userData.userName,
        })
      );
      return batch.commit();
    });
};

const updateUserDataInComments = (userData: UserData): Promise<void> => {
  return db
    .collectionGroup('comments')
    .where('authorUid', '==', userData.uid)
    .get()
    .then((querySnapshot) => {
      const batch = db.batch();
      querySnapshot.forEach((doc) =>
        batch.update(doc.ref, {
          authorId: userData.userId,
          authorName: userData.userName,
        })
      );
      return batch.commit();
    });
};

export const saveUserData = (userData: UserData): Promise<void> => {
  return Promise.all([
    saveUserDataInUsers(userData),
    updateUserDataInQueries(userData),
    updateUserDataInComments(userData),
  ]).then();
};

export const fetchQuery = (queryId: string): Promise<Query | null> => {
  return db
    .collection('queries')
    .doc(queryId)
    .get()
    .then((doc) => (doc.data() as Query) ?? null);
};

export const fetchQueryList = (
  cursor: number,
  limit: number,
  searchOptions: SearchOptions = {}
): Promise<Query[]> => {
  let query = db
    .collection('queries')
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(limit);

  if (searchOptions.authorUid) {
    query = query.where('authorUid', '==', searchOptions.authorUid);
  }

  if (searchOptions.endpoint) {
    query = query.where('endpoint', '==', searchOptions.endpoint);
  }

  if (searchOptions.tag) {
    query = query.where('tags', 'array-contains', searchOptions.tag);
  }

  return query
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data() as Query)
    );
};

export const fetchAllQueries = (): Promise<Query[]> => {
  return db
    .collection('queries')
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data() as Query)
    );
};

export const fetchAllQueriesByEndpoint = (
  endpoint: string
): Promise<Query[]> => {
  return db
    .collection('queries')
    .where('endpoint', '==', endpoint)
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data() as Query)
    );
};

export const saveQuery = (query: Query): Promise<void> => {
  return db.collection('queries').doc(query.queryId).set(query);
};

const deleteLikesLinkedToQuery = (queryId: string): Promise<void> => {
  return db
    .collectionGroup('likes')
    .where('queryId', '==', queryId)
    .get()
    .then((querySnapshot) => {
      const batch = db.batch();
      querySnapshot.forEach((doc) => batch.delete(doc.ref));
      batch.commit();
    });
};

const deleteCommentsLinkedToQuery = (queryId: string): Promise<void> => {
  return db
    .collection('queries')
    .doc(queryId)
    .collection('comments')
    .get()
    .then((querySnapshot) => {
      const batch = db.batch();
      querySnapshot.forEach((doc) => batch.delete(doc.ref));
      return batch.commit();
    });
};

export const deleteQuery = (queryId: string): Promise<void> => {
  return Promise.all([
    deleteLikesLinkedToQuery(queryId),
    deleteCommentsLinkedToQuery(queryId),
  ]).then(() => db.collection('queries').doc(queryId).delete());
};

export const fetchQueryListLikedByUser = (
  uid: string,
  cursor: number,
  limit: number
): Promise<QueryWithLikedAt[]> => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(limit)
    .get()
    .then((querySnapshot) => {
      const likes = querySnapshot.docs.map((doc) => doc.data());
      if (likes.length === 0) return [];
      const ids = likes.map((like) => like.queryId);
      return db
        .collection('queries')
        .where('queryId', 'in', ids)
        .get()
        .then((querySnapshot) => {
          const queries = {} as { [key: string]: Query };
          querySnapshot.forEach((doc) => {
            queries[doc.id] = doc.data() as Query;
          });
          return likes.map((like) => ({
            ...queries[like.queryId],
            likedAt: like.createdAt,
          }));
        });
    });
};

export const fetchLikeCount = (queryId: string): Promise<number> => {
  return db
    .collectionGroup('likes')
    .where('queryId', '==', queryId)
    .get()
    .then((querySnapshot) => querySnapshot.size);
};

export const fetchLikedByUser = (
  uid: string,
  queryId: string
): Promise<boolean> => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .doc(likeId(uid, queryId))
    .get()
    .then((doc) => doc.exists);
};

export const createLike = (uid: string, queryId: string): Promise<void> => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .doc(likeId(uid, queryId))
    .set({ uid, queryId, createdAt: Date.now() });
};

export const deleteLike = (uid: string, queryId: string): Promise<void> => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .doc(likeId(uid, queryId))
    .delete();
};

export const fetchEndpointList = (): Promise<string[]> => {
  return db
    .collection('queries')
    .get()
    .then((querySnapshot) => {
      const set = new Set<string>();
      querySnapshot.forEach((doc) => set.add(doc.get('endpoint')));
      return [...set];
    });
};

export const fetchCommentList = (queryId: string): Promise<Comment[]> => {
  return db
    .collection('queries')
    .doc(queryId)
    .collection('comments')
    .orderBy('createdAt', 'asc')
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data() as Comment)
    );
};

export const saveComment = (comment: Comment): Promise<void> => {
  return db
    .collection('queries')
    .doc(comment.queryId)
    .collection('comments')
    .doc(comment.commentId)
    .set(comment);
};

export const deleteComment = (
  queryId: string,
  commentId: string
): Promise<void> => {
  return db
    .collection('queries')
    .doc(queryId)
    .collection('comments')
    .doc(commentId)
    .delete();
};

export const fetchNotifications = (
  uid: string,
  cursor: number,
  limit: number
): Promise<Notification[]> => {
  return db
    .collection('users')
    .doc(uid)
    .collection('notifications')
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(limit)
    .get()
    .then((querySnapshot) => {
      const batch = db.batch();
      querySnapshot.forEach((doc) => batch.update(doc.ref, { unread: false }));
      batch.commit(); // Mark read

      return querySnapshot.docs.map((doc) => doc.data() as Notification);
    });
};

export const fetchUnreadNotificationCount = (uid: string): Promise<number> => {
  return db
    .collection('users')
    .doc(uid)
    .collection('notifications')
    .where('unread', '==', true)
    .get()
    .then((querySnapshot) => querySnapshot.size);
};

export const createNotification = (
  destinationUid: string,
  notification: Notification
): Promise<void> => {
  return db
    .collection('users')
    .doc(destinationUid)
    .collection('notifications')
    .doc(notification.notificationId)
    .set(notification);
};

export const deleteNotification = (
  destinationUid: string,
  notificationId: string
): Promise<void> => {
  return db
    .collection('users')
    .doc(destinationUid)
    .collection('notifications')
    .doc(notificationId)
    .delete();
};
