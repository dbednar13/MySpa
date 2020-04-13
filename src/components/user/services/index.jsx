import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Addons from './addons';
import Services from './services';

const UserServices = ({ firebase }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    <>
      <Services user={user} />
      <div className='pt-3 pb-3'>
        <Divider variant='middle' />
      </div>
      <Addons user={user} />
    </>
  );
};

UserServices.propTypes = {
  firebase: shape({}).isRequired,
};

export default UserServices;
