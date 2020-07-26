import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { shape } from 'prop-types';

import { fireStore } from '../../firebase';
import { isLoggedIn } from '../../helpers/cookieHelper';

const User = ({ firebase, cookies }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUser = () => {
    return fireStore
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const tempUser = {};
        // should only ever have one doc.
        snapshot.forEach((doc) => {
          const data = doc.data();
          tempUser.firstName = data.firstName ? data.firstName : '';
          tempUser.lastName = data.lastName ? data.lastName : '';
          tempUser.preferredEmail = data.preferredEmail
            ? data.preferredEmail
            : '';
          tempUser.phoneNumber = data.phoneNumber ? data.phoneNumber : '';
        });
        setUserData(tempUser);
      });
  };

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, [firebase]);

  useEffect(() => {
    if (user) {
      return getUser();
    }
    return () => {};
  }, [user]);

  return !isLoggedIn(cookies, firebase) ? (
    <Redirect to='/SignOut' />
  ) : (
    <>Maintain a User - aka profile</>
  );
};

User.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};

export default withCookies(User);
