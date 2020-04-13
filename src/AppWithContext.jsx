import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { shape } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import About from './components/about';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/logIn';
import SignOut from './components/signOut';
import Clients from './components/clients';
import UserServices from './components/user/services';
import User from './components/user';
import Nav from './Nav';
import { withFirebase, fireStore } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const AppWithContext = ({ firebase }) => {
  const [currentUser, setCurrentUser] = useState({
    authenticated: false,
    user: null,
  });
  const NavWithFirebase = withFirebase(Nav);

  firebase.auth().onAuthStateChanged(() => {
    const user = firebase.auth().currentUser;
    if (currentUser.user !== user) {
      if (user) {
        setCurrentUser({ authenticated: true, user });
        const index = user.displayName.indexOf(' ');
        fireStore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              fireStore
                .collection('users')
                .doc(user.uid)
                .set({
                  email: user.email,
                  firstName: user.displayName.substring(0, index),
                  lastName: user.displayName.substring(index + 1),
                });
            } else if (
              !user.displayName.startsWith(doc.firstName) ||
              !user.displayName.endsWith(doc.lastName)
            ) {
              fireStore
                .collection('users')
                .doc(user.uid)
                .set(
                  {
                    email: user.email,
                    firstName: user.displayName.substring(0, index),
                    lastName: user.displayName.substring(index + 1),
                  },
                  { merge: true }
                );
            }
          });
        fireStore
          .collection('users')
          .doc(user.uid)
          .set(
            {
              email: user.email,
              firstName: user.displayName.substring(0, index),
              lastName: user.displayName.substring(index + 1),
            },
            { merge: true }
          );
      } else {
        setCurrentUser({ authenticated: false, user: null });
      }
    }
  });
  return (
    <div className='App'>
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
