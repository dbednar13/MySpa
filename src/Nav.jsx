import React from 'react';
import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Navbar, NavDropdown, Dropdown } from 'react-bootstrap';

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
              LogIn
            </NavLink>
          </div>
        )}
        <NavDropdown title='Account' id='collasible-nav-dropdown'>
          <NavLink to='/User' disabled={!authenticated}>
            My Account
          </NavLink>
          <NavLink to='/User/Services' disabled={!authenticated}>
            My Services
          </NavLink>
          <Dropdown.Divider />
          {!authenticated && <NavLink to='/Login'>Log in</NavLink>}
          {authenticated && <NavLink to='/SignOut'>Sign Out</NavLink>}
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

Nav.propTypes = {
  authenticated: bool.isRequired
};

export default Nav;
