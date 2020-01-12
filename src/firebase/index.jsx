import app from 'firebase/app';
import FirebaseContext from './context';
import firebaseDevConfig from '../constants/FirebaseDevConfig';
import firebaseProdConfig from '../constants/FirebaseProdConfig';

import 'firebase/auth';
import 'firebase/firestore';

const config =
  process.env.REACT_APP_MODE === 'prod'
    ? firebaseProdConfig
    : firebaseDevConfig;
/*
 * Initialize Firebase - in a perfect world we wouldn't need the .firebase_
 * but as is, we'd otherwise have to do Firebase.firebase_.<<whatever we need>>
 * This makes life cleaner for us down the road.
 */
// eslint-disable-next-line no-underscore-dangle
const Firebase = app.initializeApp(config).firebase_;

export default Firebase;

export { FirebaseContext };
