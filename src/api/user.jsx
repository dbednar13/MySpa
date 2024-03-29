import { fireStore } from '../firebase';

export function createUserObject(displayName, email) {
  const index = displayName.indexOf(' ');
  return {
    email,
    firstName: displayName.substring(0, index),
    lastName: displayName.substring(index + 1),
  };
}

export function fetchUser(uid) {
  return fireStore.collection('users').doc(uid).get();
}

export function createUser(uid, user, callback) {
  fireStore
    .collection('users')
    .doc(uid)
    .set({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
    .then(callback);
}

export function updateUser(uid, user, callback) {
  fireStore
    .collection('users')
    .doc(uid)
    .set(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      { merge: true }
    )
    .then(callback);
}

export function updateUserNotice(userId, type, notice) {
  const dateAccepted = new Date();

  fireStore
    .collection('users')
    .doc(userId)
    .collection('notifications')
    .add({ type, notice, dateAccepted });

  return fireStore.collection('users').doc(userId).set(
    {
      hipaaConsent: true,
    },
    { merge: true }
  );
}
