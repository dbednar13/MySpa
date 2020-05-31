import { fireStore } from '../firebase';

export function deleteClient(userId, id) {
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('clients')
    .doc(id)
    .update({ active: false });
}

export function fetchClients(userId) {
  return fireStore.collection('users').doc(userId).collection('clients').get();
}

export function saveClient(
  userId,
  isNew,
  name,
  discount,
  emailAddress,
  phoneNumber,
  notes,
  id
) {
  if (isNew || id === 'NaC') {
    return fireStore
      .collection('users')
      .doc(userId)
      .collection('clients')
      .add({
        name,
        phoneNumber,
        emailAddress,
        discount: Number(discount),
        notes,
        active: true,
      });
  }
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('clients')
    .doc(id)
    .set(
      {
        name,
        phoneNumber,
        emailAddress,
        discount: Number(discount),
        notes,
      },
      { merge: true }
    );
}
