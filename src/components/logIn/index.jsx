import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import LogInView from './logInView';

function LogIn() {
  /*const handleSignUp = async event => {
    event.preventDefault();
    const history = useHistory();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      // eslint-disable-next-line
      alert(error);
    }
  };*/

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/dashboard',
    // We will display Github as the auth provider.
    signInOptions: [
      firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}

export default withRouter(LogIn);
