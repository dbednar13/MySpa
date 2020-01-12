import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  /* eslint-disable react/jsx-props-no-spreading */
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
  /* eslint-enable react/jsx-props-no-spreading */
);

export default FirebaseContext;
