import React from 'react';
import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Navbar } from 'react-bootstrap';

function Nav({ authenticated }) {
  return (
    <Navbar
      bg='dark'
      variant='dark'
      sticky='top'
      className='justify-content-center'>
      <div className='nav-item'>
        <NavLink
          className='nav-link'
          exact
          activeClassName='nav-link active'
          to='/'>
          Home
        </NavLink>
      </div>
      <div className='nav-item'>
        <NavLink
          className='nav-link'
          activeClassName='nav-link active'
          to='/About'>
          About
        </NavLink>
      </div>
      {authenticated && (
        <div className='nav-item'>
          <NavLink
            className='nav-link'
            activeClassName='nav-link active'
            to='/DashBoard'>
            DashBoard
          </NavLink>
        </div>
      )}
      <div className='nav-item'>
        <NavLink
          className='nav-link'
          activeClassName='nav-link active'
          to='/Login'>
          LogIn
        </NavLink>
      </div>
    </Navbar>
  );
}

Nav.propTypes = {
  authenticated: bool.isRequired
};

export default Nav;
