import { fireStore } from '../firebase';

export function deleteService(userId, id) {
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('services')
    .doc(id)
    .update({ active: false });
}

export function fetchServices(userId) {
  return fireStore.collection('users').doc(userId).collection('services').get();
}

export function saveService(userId, isNew, name, duration, cost, id) {
  if (isNew || id === -1) {
    return fireStore
      .collection('users')
      .doc(userId)
      .collection('services')
      .add({
        name,
        duration: Number(duration),
        cost: Number(cost),
        active: true,
      });
  }
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('services')
    .doc(id)
    .set(
      { name, duration: Number(duration), cost: Number(cost) },
      { merge: true }
    );
}
