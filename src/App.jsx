import React from 'react';
import AppWithContext from './AppWithContext';
import { FirebaseContext } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const App = () => {
  return (
    <FirebaseContext.Consumer>
      {firebase => {
        return <AppWithContext firebase={firebase} />;
      }}
    </FirebaseContext.Consumer>
  );
};

export default App;
