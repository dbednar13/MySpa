import React from 'react';
import { shape } from 'prop-types';
import { StyledFirebaseAuth } from 'react-firebaseui';

const LogIn = ({ firebase }) => {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl: '/dashboard',
    signInOptions: [
      firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  return (
    <div>
      <h3>Log in or sign up below!</h3>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

LogIn.propTypes = {
  firebase: shape({}).isRequired
};
export default LogIn;
