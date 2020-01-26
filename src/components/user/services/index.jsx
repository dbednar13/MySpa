import React from 'react';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Service from './service';

const Services = ({ firebase }) => {
  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      <div>View and maintain a list of services provided by the user</div>
      <Service />
    </>
  );
};

Services.propTypes = {
  firebase: shape({}).isRequired
};

export default Services;
