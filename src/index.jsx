import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase, { FirebaseContext } from './firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirebaseContext.Provider value={Firebase}>
    <AppContainer>
      <App />
    </AppContainer>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
