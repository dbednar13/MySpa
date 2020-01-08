import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import About from './components/about';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/logIn';
import SignOut from './components/signOut';
import SignUp from './components/signUp';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />

        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/Login" component={Login} />
            <Route path="/SignOut" component={SignOut} />
            <Route path="/SignUp" component={SignUp} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
