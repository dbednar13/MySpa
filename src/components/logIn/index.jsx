import React from 'react';
import { withRouter } from 'react-router';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { FirebaseContext } from '../../firebase';

function LogIn() {
  return (
    <FirebaseContext.Consumer>
      {firebase => {
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
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        );
      }}
    </FirebaseContext.Consumer>
  );
}

export default withRouter(LogIn);
