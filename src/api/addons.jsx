import { fireStore } from '../firebase';

export function deleteAddon(userId, id) {
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('addons')
    .doc(id)
    .update({ active: false });
}

export function fetchAddons(userId) {
  return fireStore.collection('users').doc(userId).collection('addons').get();
}

export function saveAddon(userId, isNew, name, cost, active, id = -1) {
  if (isNew || id === -1) {
    return fireStore
      .collection('users')
      .doc(userId)
      .collection('addons')
      .add({ name, cost: Number(cost), active });
  }
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('addons')
    .doc(id)
    .set({ name, cost: Number(cost), active }, { merge: true });
}
