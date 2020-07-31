import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Formik } from 'formik';
import { shape } from 'prop-types';

import { fireStore } from '../../firebase';
import { isLoggedIn } from '../../helpers/cookieHelper';

import {
  PhoneFormikField,
  TextFormikField,
} from '../common/formik';

import {
  validateName,
  validateEmail,
  validatePhone,
} from '../../validators';

const User = ({ firebase, cookies }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUser = () => {
    return fireStore
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const tempUser = {};       
        const data = snapshot.data();

        tempUser.firstName = data.firstName ? data.firstName : '';
        tempUser.lastName = data.lastName ? data.lastName : '';
        tempUser.preferredEmail = data.preferredEmail
          ? data.preferredEmail
          : '';
        tempUser.phoneNumber = data.phoneNumber ? data.phoneNumber : '';
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
    <>
      <>Maintain a User - aka profile</>
      <Formik
        initialValues={userData}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize>
        {({ values, resetForm, errors }) => (
          <form>
            <div className='pb-3 pr-3 pl-3'>
              <TextFormikField
                name='firstName'
                textField={{
              label: 'First Name:',
              id: `firstName`,
              placeholder: 'First Name',
            }}
                validate={(value) => {
              return validateName(value);
            }}
            />
            </div>
            <div className='pb-3 pr-3 pl-3'>
              <TextFormikField
                name='lastName'
                textField={{
              label: 'Last Name:',
              id: `lastName`,
              placeholder: 'Last Name',
            }}
                validate={(value) => {
              return validateName(value);
            }}
          />
            </div>
            <div className='pb-3 pr-3 pl-3'>
              <TextFormikField
                name='preferredEmail'
                label='Preferred Email Address:'
                textField={{
            id: `preferredEmail`,
            placeholder: 'Email',
            fullWidth: true,
          }}
                validate={(value) => {
            return validateEmail(value);
          }}
        />
            </div>
            <div className='pb-3 pr-3 pl-3'>
              <PhoneFormikField
                name='phoneNumber'
                phoneField={{
            id: `phoneNumber`,
            label: 'Phone Number:',
          }}
                validate={(value) => {
            return validatePhone(value);
          }}
        />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

User.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};

export default withCookies(User);
