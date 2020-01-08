import firebase from 'firebase/app';
import firebaseDevConfig from './constants/FirebaseDevConfig';
import firebaseProdConfig from './constants/FirebaseProdConfig';

const config = process.env.REACT_APP_MODE === 'prod' ? firebaseProdConfig : firebaseDevConfig;
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
