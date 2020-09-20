import { db } from '@/lib/firebase';
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
