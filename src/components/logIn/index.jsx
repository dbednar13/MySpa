import React from 'react';
import { shape } from 'prop-types';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { withCookies } from 'react-cookie';

import { getCookieData } from '../../helpers/cookieHelper';

const LogIn = ({ firebase, cookies }) => {
  const uiConfig = {
    // Popup sign in flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl: '/Dashboard',
    callbacks: {
      // Might need this later if we ever have to override and go back to where we came from.  Save it.
      // signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      signInSuccessWithAuthResult: (authResult) => {
        const cookieData = getCookieData(authResult.user);
        cookies.set(cookieData.cookieName, cookieData.data, cookieData.options);

        return true;
      },
    },
    signInOptions: [
      // firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <div>
      <h3>Log in or sign up below!</h3>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

LogIn.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};
export default withCookies(LogIn);
