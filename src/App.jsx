import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import About from './components/about';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/logIn';
import SignOut from './components/signOut';
import Nav from './Nav';
import { withFirebase } from './firebase';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav />

        <div className='container'>
          <Switch>
            <Route exact path='/' component={withFirebase(Home)} />
            <Route path='/About' component={withFirebase(About)} />
            <Route path='/Dashboard' component={withFirebase(Dashboard)} />
            <Route path='/dashboard' component={withFirebase(Dashboard)} />
            <Route path='/Login' component={withFirebase(Login)} />
            <Route path='/SignOut' component={withFirebase(SignOut)} />
            <Route component={withFirebase(Home)} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
