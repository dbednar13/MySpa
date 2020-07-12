const admin = require('firebase-admin');

module.exports = function createSessionCookie(idToken) {
  //  milliseconds * seconds * minutes * hours * days
  const expires = 1000 * 60 * 20 * 1 * 1;

  admin.firestore.CollectionReference('').onSnapShot();

  return admin.auth().createSessionCookie(idToken, { expires });
};