import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRoutes } from 'redux-first-router';
import queryString from 'query-string';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';

import routesMap from '_router';
import * as reducers from '_redux/reducers';

import {
  nodeEnv,
  isDev,
  isBrowser,
  isServer,
  isOnLogger,
} from '_client/envHelper';

if (isDev) {
  console.log('- NODE_ENV ? ', nodeEnv);
  console.log('- is Browser ? ', isBrowser);
  console.log('- is Server  ? ', isServer);
}

export default function storeConfig(history, preLoadedState) {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routesMap,
    {
      querySerializer: queryString,
    }
  );

  const rootReducer = combineReducers({
    ...reducers,
    location: reducer,
  });
  const middlewareList = [thunkMiddleware, middleware];

  if (isDev) {
    if (module.hot) {
      module.hot.accept('../shared/redux/reducers/index', () => {
        // eslint-disable-next-line
        const nextReducers = require('../shared/redux/reducers/index');
        const rootReducer = combineReducers({
          ...nextReducers,
          location: reducer,
        });
        store.replaceReducer(rootReducer);
      });
    }

    if (isBrowser && isOnLogger) {
      // Note: `logger` must be the last middleware in chain
      const logger = createLogger({
        duration: true,
        diff: true,
      });

      middlewareList.push(logger);
    }
  }

  const middlewares = applyMiddleware(...middlewareList);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preLoadedState, enhancers);

  return { store, thunk };
}

const composeEnhancers = (...args) =>
  isBrowser ? composeWithDevTools({})(...args) : compose(...args);
