import React from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';

const SignOut = ({ firebase }) => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }

  return <Redirect to='/Home' />;
};

SignOut.propTypes = {
  firebase: shape({}).isRequired
};

export default SignOut;
