import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import '_scss/main.scss';
import '_css/main.css';
import 'react-dates/lib/css/_datepicker.css';

import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from '../shared/react/App';
import configureStore from './configureStore';

export const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE);

const render = App => {
  const root = document.getElementById('root');

  hydrate(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('../shared/react/App', () => {
    // eslint-disable-next-line
    const App = require('../shared/react/App').default;

    render(App);
  });
}
