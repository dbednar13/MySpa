import React from 'react';
import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Navbar, NavDropdown } from 'react-bootstrap';

function Nav({ authenticated }) {
  return (
    <Navbar bg='dark' variant='dark' sticky='top'>
      <Navbar.Brand href='/Home'>My Spa Assistant</Navbar.Brand>
      <Navbar.Collapse>
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
      </Navbar.Collapse>
      <Navbar.Collapse className='justify-content-end'>
        {!authenticated && (
          <div className='nav-item'>
            <NavLink
              className='nav-link'
              activeClassName='nav-link active'
              to='/Login'>
              Log In
            </NavLink>
          </div>
        )}
        {authenticated && (
          <div className='nav-item'>
            <NavLink
              className='nav-link'
              activeClassName='nav-link active'
              to='/User'>
              Account
            </NavLink>
          </div>
        )}
        {authenticated && (
          <div className='nav-item'>
            <NavLink
              className='nav-link'
              activeClassName='nav-link active'
              to='/SignOut'>
              Sign out
            </NavLink>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

Nav.propTypes = {
  authenticated: bool.isRequired
};

export default Nav;
