import React from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';

const Clients = ({ firebase }) => {
  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>Maintain clients and appointments</>
  );
};

Clients.propTypes = {
  firebase: shape({}).isRequired
};

export default Clients;
