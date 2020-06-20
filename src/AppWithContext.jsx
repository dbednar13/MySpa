import React, { lazy, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router';
import { shape } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  createUser,
  createUserObject,
  fetchUser,
  updateUser,
  updateUserNotice,
} from './api/user';
import { hipaaNoticeText } from './constants/textConstants';
import { withFirebase } from './firebase';
import ConfirmModal from './components/common/confirmModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const About = lazy(() => import('./components/about'));
const Dashboard = lazy(() => import('./components/dashboard'));
const Home = lazy(() => import('./components/home'));
const Login = lazy(() => import('./components/logIn'));
const SignOut = lazy(() => import('./components/signOut'));
const Clients = lazy(() => import('./components/clients'));
const UserServices = lazy(() => import('./components/user/services'));
const User = lazy(() => import('./components/user'));
const Nav = lazy(() => import('./Nav'));

const AppWithContext = ({ firebase }) => {
  const [currentUser, setCurrentUser] = useState({
    authenticated: false,
    user: null,
  });
  const [showModal, setShowModal] = useState(false);
  const NavWithFirebase = withFirebase(Nav);

  const onModalReject = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setShowModal(false);
        window.location.assign('/Home');
      });
  };

  const onModalAccept = () => {
    updateUserNotice(currentUser.user.uid, 'hipaa', hipaaNoticeText);
    setShowModal(false);
  };

  const messageCheck = (doc) => {
    if (!doc.exists || doc.hipaaNotice !== false) {
      if (!doc.exists || !doc.data().hipaaConsent) {
        setShowModal(true);
      }
    }
  };

  const fetchCallback = (user, doc) => {
    if (!doc.exists) {
      createUser(
        currentUser.uid,
        createUserObject(currentUser.displayName),
        messageCheck(doc)
      );
    } else {
      const data = doc.data();
      if (
        !user.displayName.startsWith(data.firstName) ||
        !user.displayName.endsWith(data.lastName)
      ) {
        updateUser(user.uid, createUserObject(user.displayName));
      }
      messageCheck(doc);
    }
  };

  const tokenCallback = (user, idToken) => {
    setCurrentUser({ authenticated: true, user });
    fetchUser(user.uid).then((doc) => {
      fetchCallback(user, doc);
    });
    console.log('found token: ', idToken);
  };

  firebase.auth().onAuthStateChanged(() => {
    const user = firebase.auth().currentUser;
    if (currentUser.user !== user) {
      if (user) {
        getUserIdToken(user, tokenCallback);
      } else {
        setCurrentUser({ authenticated: false, user: null });
      }
    }
  });
  return (
    <div className='App'>
      <ConfirmModal
        show={showModal}
        bodyText={hipaaNoticeText}
        title='HIPAA NOTICE'
        onClose={onModalReject}
        onOk={onModalAccept}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <div className='pb-3'>
            <NavWithFirebase authenticated={currentUser.authenticated} />
          </div>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={withFirebase(Home)} />
              <Route exact path='/User' component={withFirebase(User)} />
              <Route path='/About' component={withFirebase(About)} />
              <Route path='/Dashboard' component={withFirebase(Dashboard)} />
              <Route path='/dashboard' component={withFirebase(Dashboard)} />
              <Route path='/Login' component={withFirebase(Login)} />
              <Route path='/SignOut' component={withFirebase(SignOut)} />
              <Route
                path='/User/Services'
                component={withFirebase(UserServices)}
              />
              <Route path='/User/Clients' component={withFirebase(Clients)} />
              <Route component={withFirebase(Home)} />
            </Switch>
          </div>
        </Router>
      </Suspense>
    </div>
  );
};

AppWithContext.propTypes = {
  firebase: shape({}).isRequired,
};

export default AppWithContext;
