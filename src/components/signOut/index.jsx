import React from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';
import { withCookies } from 'react-cookie';

import { cookieName } from '../../constants/textConstants';

const SignOut = ({ firebase, cookies }) => {
  if (firebase.auth().currentUser) {
    cookies.remove(cookieName);
    firebase.auth().signOut();
  }

  return <Redirect to='/Home' />;
};

SignOut.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};

export default withCookies(SignOut);
