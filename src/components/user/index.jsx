import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { shape } from 'prop-types';

import { isLoggedIn } from '../../helpers/cookieHelper';

const User = ({ firebase, cookies }) => {
  return !isLoggedIn(cookies, firebase) ? (
    <Redirect to='/Home' />
  ) : (
    <>Maintain a User - aka profile</>
  );
};

User.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};

export default withCookies(User);
