import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware as reactRouterMiddleware } from 'connected-react-router';

import rootReducer from './root/reducers';

export const history = createBrowserHistory();

const configureStore = preloadedState => {
  const ignoredActionTypes = [];
  const loggerMiddleware = createLogger({
    collapsed: true,
    predicate: (getState, { type }) => !ignoredActionTypes.includes(type),
  });
  const routerMiddleware = reactRouterMiddleware(history);
  const middlewares = [thunkMiddleware, routerMiddleware, loggerMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    composeEnhancers(...enhancers)
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./root/reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
