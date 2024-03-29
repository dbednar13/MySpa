import React, { lazy, Suspense, useState } from 'react';
import { Route, Switch } from 'react-router';
import { shape } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import { withCookies } from 'react-cookie';

import {
  createUser,
  createUserObject,
  fetchUser,
  updateUser,
  updateUserNotice,
} from './api/user';
import { getCookieData } from './helpers/cookieHelper';
import { maxAge } from './constants/numberConstants';
import { cookieName, hipaaNoticeText } from './constants/textConstants';
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

const AppWithContext = ({ firebase, cookies }) => {
  const [currentUser, setCurrentUser] = useState({
    authenticated: false,
    user: null,
  });
  const [showModal, setShowModal] = useState(false);
  const NavWithFirebase = withFirebase(Nav);

  let idleTimer = React.createRef();

  const onModalReject = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setShowModal(false);
        window.location.assign('/Home');
      });
  };

  const handleLogout = () => {
    cookies.remove(cookieName);
    if (idleTimer) {
      idleTimer.pause();
    }

    if (window.location.pathname !== '/Home') {
      window.location.assign('/Home');
    }
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
      if (!user.email !== data.email) {
        updateUser(user.uid, {
          firstName: data.firstName,
          lastName: data.LastName,
          email: user.email,
        });
      }
      messageCheck(doc);
    }
  };

  const onTimerAction = () => {
    const cookieData = getCookieData(currentUser.user);
    cookies.set(cookieData.cookieName, cookieData.data, cookieData.options);
  };

  const onTimerActive = () => {
    const cookieData = getCookieData(currentUser.user);
    cookies.set(cookieData.cookieName, cookieData.data, cookieData.options);
  };
  const onTimerIdle = () => {
    idleTimer.pause();
    if (currentUser.authenticated) {
      handleLogout();
    }
  };

  firebase.auth().onAuthStateChanged(() => {
    const user = firebase.auth().currentUser;
    if (currentUser.user !== user) {
      const cookie = cookies.get(cookieName);
      if (user && !cookie) {
        // user is logged into firebase but no valid cookie, sign them out.
        firebase.auth().signOut();
        handleLogout();
      } else if (user && cookie) {
        const cookieData = getCookieData(user);

        if (idleTimer) {
          idleTimer.reset();
        }
        cookies.set(cookieData.cookieName, cookieData.data, cookieData.options);
        setCurrentUser({ authenticated: true, user });
        fetchUser(user.uid).then((doc) => {
          fetchCallback(user, doc);
        });
      } else {
        setCurrentUser({ authenticated: false, user: null });
        handleLogout();
      }
    }
  });
  return (
    <>
      <IdleTimer
        ref={(ref) => {
          idleTimer = ref;
        }}
        element={document}
        onActive={onTimerActive}
        onIdle={onTimerIdle}
        onAction={onTimerAction}
        debounce={250}
        timeout={1000 * maxAge}
        events={[
          'keydown',
          'wheel',
          'DOMMouseScroll',
          'mouseWheel',
          'mousedown',
        ]}
        stopOnIdle
      />
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
    </>
  );
};

AppWithContext.propTypes = {
  cookies: shape({}).isRequired,
  firebase: shape({}).isRequired,
};

export default withCookies(AppWithContext);
