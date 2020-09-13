import { fireStore } from '../firebase';

export function saveAppointment(userId, isNew, appointment) {
  if (isNew) {
    return fireStore
      .collection('users')
      .doc(userId)
      .collection('appointments')
      .add(appointment);
  }
  return fireStore
    .collection('users')
    .doc(userId)
    .collection('appointments')
    .doc(appointment.id)
    .set(appointment, { merge: true });
}

export default saveAppointment;
