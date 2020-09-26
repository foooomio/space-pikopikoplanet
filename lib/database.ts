import { db } from '@/lib/firebase';
import { likeId } from '@/lib/util';
import type {
  UserData,
  Query,
  SearchOptions,
  QueryWithLikedAt,
} from '@/lib/types';

export const fetchUserData = (uid: string): Promise<UserData> => {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => (doc.data() ?? {}) as UserData);
};

export const fetchUserDataByUserId = (userId: string): Promise<UserData> => {
  return db
    .collection('users')
    .where('userId', '==', userId)
    .get()
    .then(
      (querySnapshot) =>
        (querySnapshot.size !== 0
          ? querySnapshot.docs[0].data()
          : {}) as UserData
    );
};

const saveUserDataInUsers = (userData: UserData): Promise<void> => {
  return db.collection('users').doc(userData.uid).set(userData);
};

const updateUserDataInQueries = (userData: UserData): Promise<void> => {
  const batch = db.batch();
  return db
    .collection('queries')
    .where('authorUid', '==', userData.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        batch.update(doc.ref, {
          authorId: userData.userId,
          authorName: userData.userName,
        })
      );
    })
    .then(() => batch.commit());
};

export const saveUserData = (userData: UserData): Promise<[void, void]> => {
  return Promise.all([
    saveUserDataInUsers(userData),
    updateUserDataInQueries(userData),
  ]);
};

export const fetchQuery = (queryId: string): Promise<Query> => {
  return db
    .collection('queries')
    .doc(queryId)
    .get()
    .then((doc) => doc.data() as Query);
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

  if (searchOptions.tag) {
    query = query.where('tags', 'array-contains', searchOptions.tag);
  }

  return query
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data() as Query)
    );
};

export const saveQuery = (queryId: string, query: Query): Promise<void> => {
  return db.collection('queries').doc(queryId).set(query, { merge: true });
};

export const deleteQuery = (queryId: string): Promise<void> => {
  return db.collection('queries').doc(queryId).delete();
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
      querySnapshot.forEach((doc) => set.add(doc.data().endpoint));
      return [...set];
    });
};
