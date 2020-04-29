import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { shape } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  createUser,
  createUserObject,
  fetchUser,
  updateUser,
} from './api/user';
import About from './components/about';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/logIn';
import SignOut from './components/signOut';
import Clients from './components/clients';
import UserServices from './components/user/services';
import User from './components/user';
import Nav from './Nav';
import { withFirebase } from './firebase';
import ConfirmModal from './components/common/confirmModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const AppWithContext = ({ firebase }) => {
  const [currentUser, setCurrentUser] = useState({
    authenticated: false,
    user: null,
  });
  const [showModal, setShowModal] = useState(false);
  const NavWithFirebase = withFirebase(Nav);

  const bodyText = (
    <p>
      While your data is secured, this service is not yet compliant with Health
      Insurance Portability and Accountability Act (HIPAA). We cannot be held
      responsible for any of your clients Protected Personal Information (PPI).
      Please do not enter any PPI until our certification process is completed
    </p>
  );

  const onModalReject = () => {
    // TODO
    // Sign out
    setShowModal(false);
  };

  const onModalAccept = () => {
    // TODO
    // Update User
    setShowModal(false);
  };

  const messageCheck = (doc) => {
    if (!doc.exists || doc.hipaaNotice !== false) {
      // todo - popup hipaa notice & acceptance.
      // eslint-disable-next-line no-console
      console.log('messageCheck');

      if (!doc.exists || !doc.data().hipaaConsent) {
        setShowModal(false);
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

  firebase.auth().onAuthStateChanged(() => {
    const user = firebase.auth().currentUser;
    if (currentUser.user !== user) {
      if (user) {
        setCurrentUser({ authenticated: true, user });
        fetchUser(user.uid).then((doc) => {
          fetchCallback(user, doc);
        });
      } else {
        setCurrentUser({ authenticated: false, user: null });
      }
    }
  });
  return (
    <div className='App'>
      <ConfirmModal
        show={showModal}
        bodyText={bodyText}
        title='HIPAA NOTICE'
        onClose={onModalReject}
        onOk={onModalAccept}
      />
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
    </div>
  );
};

AppWithContext.propTypes = {
  firebase: shape({}).isRequired,
};

export default AppWithContext;
