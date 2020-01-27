import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Clients from '../clients';
import Services from './services';

const User = ({ firebase }) => {
  const [selectedPage, setSelectedPage] = useState('user');

  const handleClick = page => {
    setSelectedPage(page);
  };

  const getDisplayedPage = () => {
    switch (selectedPage) {
      case 'services':
        return <Services firebase={firebase} />;
      case 'clients':
        return <Clients firebase={firebase} />;
      case 'user':
      default:
        return <>Maintain a User - aka profile</>;
    }
  };

  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  const itemList = [
    { page: 'user', text: 'My Account', icon: '' },
    { page: 'clients', text: 'Clients', icon: '' },
    { page: 'services', text: 'My Services', icon: '' }
  ];

  return !firebase.auth().currentUser ? (
    <Redirect to='/Home' />
  ) : (
    /*
     * Ok, I really don't like the drawer being used.  It covers the nav bar and coloring is a pain.  not intended to be permanent but best we have for now.
     */
    <>
      <ThemeProvider theme={theme}>
        <Drawer variant='permanent' pallette={{ type: 'dark' }}>
          <List>
            {itemList.map(item => (
              <ListItem
                button
                key={item.page}
                onClick={() => {
                  handleClick(item.page);
                }}
                selected={item.page === selectedPage}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </ThemeProvider>
      <main>{getDisplayedPage()}</main>
    </>
  );
};

User.propTypes = {
  firebase: shape({}).isRequired
};

export default User;
