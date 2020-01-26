import React from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';

const User = ({ firebase }) => {
  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>Maintain a User - aka profile</>
  );
};

User.propTypes = {
  firebase: shape({}).isRequired
};

export default User;
