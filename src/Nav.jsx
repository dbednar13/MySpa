import React from 'react';
import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Navbar, NavDropdown } from 'react-bootstrap';

function Nav({ authenticated }) {
  return (
    <Navbar bg='dark' variant='dark' sticky='top'>
      <Navbar.Brand href='/home'>My Spa Assistant</Navbar.Brand>
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
              LogIn
            </NavLink>
          </div>
        )}
        <NavDropdown title='Account' id='collasible-nav-dropdown'>
          <NavDropdown.Item href='/services'>My Services</NavDropdown.Item>
          <NavDropdown.Item href='/account'>My Account</NavDropdown.Item>
          <NavDropdown.Divider />
          {!authenticated && (
            <NavDropdown.Item href='/Login'>Log in</NavDropdown.Item>
          )}
          {authenticated && (
            <NavDropdown.Item href='/SignOut'>Sign Out</NavDropdown.Item>
          )}
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

Nav.propTypes = {
  authenticated: bool.isRequired
};

export default Nav;
