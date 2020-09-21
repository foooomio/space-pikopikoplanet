import { db } from '@/lib/firebase';
import { likeId } from '@/lib/util';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export const fetchUser = (uid) => {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => doc.data() ?? {});
};

export const fetchUserByUserId = (userId) => {
  return db
    .collection('users')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) =>
      querySnapshot.size !== 0 ? querySnapshot.docs[0].data() : {}
    );
};

export const saveUserInUsers = (user) => {
  return db.collection('users').doc(user.uid).set(user);
};

export const updateUserInQueries = (user) => {
  const batch = db.batch();
  return db
    .collection('queries')
    .where('authorUid', '==', user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        batch.update(doc.ref, {
          authorId: user.userId,
          authorName: user.userName,
        })
      );
    })
    .then(() => batch.commit());
};

export const saveUser = (user) => {
  return Promise.all([saveUserInUsers(user), updateUserInQueries(user)]);
};

export const fetchQuery = (queryId) => {
  return db
    .collection('queries')
    .doc(queryId)
    .get()
    .then((doc) => doc.data());
};

export const fetchQueryList = (cursor, searchOptions = {}) => {
  let query = db
    .collection('queries')
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(NUMBER_IN_QUERY_LIST + 1);

  if (searchOptions.authorUid) {
    query = query.where('authorUid', '==', searchOptions.authorUid);
  }

  if (searchOptions.tag) {
    query = query.where('tags', 'array-contains', searchOptions.tag);
  }

  return query
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
};

export const saveQuery = (queryId, data) => {
  return db.collection('queries').doc(queryId).set(data, { merge: true });
};

export const deleteQuery = (queryId) => {
  return db.collection('queries').doc(queryId).delete();
};

export const fetchQueryListLikedByUser = (uid, cursor) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(NUMBER_IN_QUERY_LIST)
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
          const queries = {};
          querySnapshot.forEach((doc) => (queries[doc.id] = doc.data()));
          return likes.map((like) => ({
            ...queries[like.queryId],
            likedAt: like.createdAt,
          }));
        });
    });
};

export const fetchLikeCount = (queryId) => {
  return db
    .collectionGroup('likes')
    .where('queryId', '==', queryId)
    .get()
    .then((querySnapshot) => querySnapshot.size);
};

export const fetchLikedByUser = (uid, queryId) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .doc(likeId(uid, queryId))
    .get()
    .then((doc) => doc.exists);
};

export const createLike = (uid, queryId) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .doc(likeId(uid, queryId))
    .set({ uid, queryId, createdAt: Date.now() });
};

export const deleteLike = (uid, queryId) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('likes')
    .doc(likeId(uid, queryId))
    .delete();
};
