import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FirebaseContext } from './firebase';

function Nav() {
  return (
    <span>
      <NavLink exact activeClassName='active' to='/'>
        Home
      </NavLink>
      <NavLink activeClassName='active' to='/About'>
        About
      </NavLink>
      <NavLink activeClassName='active' to='/DashBoard'>
        DashBoard
      </NavLink>
      <NavLink activeClassName='active' to='/Login'>
        LogIn
      </NavLink>
    </span>
  );
}

export default Nav;
