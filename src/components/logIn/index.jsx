import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import firebase from '../../Firebase';
import LogInView from './logInView';


function LogIn() {
  const handleSignUp = async (event) => {
    event.preventDefault();
    const history = useHistory();
    const { email, password } = event.target.elements;
    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      // eslint-disable-next-line
      alert(error);
    }
  };


  return <LogInView onSubmit={handleSignUp} />;
}

export default withRouter(LogIn);
