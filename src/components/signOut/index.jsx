import React from 'react';
import { shape } from 'prop-types';

const SignOut = ({ firebase }) => {
  firebase.auth().signOut();

  return <>Sign Out</>;
};

SignOut.propTypes = {
  firebase: shape({}).isRequired
};

export default SignOut;
