import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Addons from './addons';
import Services from './services';
import { isLoggedIn } from '../../../helpers/cookieHelper';

const UserServices = ({ cookies, firebase }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  return !isLoggedIn(cookies, firebase) ? (
    <Redirect to='/SignOut' />
  ) : (
    <>
      {user && (
        <>
          <Services user={user} />
          <div className='pt-3 pb-3'>
            <Divider variant='middle' />
          </div>
          <Addons user={user} />
        </>
      )}
    </>
  );
};

UserServices.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};

export default withCookies(UserServices);
