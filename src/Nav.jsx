import React from 'react';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';
import { Navbar, NavItem, NavDropdown, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Nav({ authenticated }) {
  return (
    <Navbar bg='dark' variant='dark' sticky='top'>
      <Navbar.Brand href='/Home'>My Spa Assistant</Navbar.Brand>
      <Navbar.Collapse>
        <div>
          <Link className='nav-link' to='/'>
            Home
          </Link>
        </div>
        <div>
          <Link className='nav-link' to='/About'>
            About
          </Link>
        </div>
        {authenticated && (
          <div>
            <Link className='nav-link' to='/DashBoard'>
              Dashboard
            </Link>
          </div>
        )}
      </Navbar.Collapse>
      <Navbar.Collapse className='justify-content-end'>
        {!authenticated && (
          <div className='nav-item'>
            <Link className='nav-link' to='/Login'>
              Log In
            </Link>
          </div>
        )}
        {authenticated && (
          <div className='row'>
            <NavDropdown title='Account' id='collasible-nav-dropdown'>
              <NavDropdown.Item>
                <LinkContainer to='/User'>
                  <NavItem>My Account</NavItem>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer to='/User/Services'>
                  <NavItem>My Services</NavItem>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <LinkContainer to='/User/Clients'>
                  <NavItem>Clients</NavItem>
                </LinkContainer>
              </NavDropdown.Item>
              <Dropdown.Divider />
              <NavDropdown.Item>
                <LinkContainer to='/SignOut'>
                  <NavItem>Sign Out</NavItem>
                </LinkContainer>
              </NavDropdown.Item>
            </NavDropdown>
            <Link className='nav-link' to='/SignOut'>
              Sign out
            </Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

Nav.propTypes = {
  authenticated: bool.isRequired,
};

export default Nav;
