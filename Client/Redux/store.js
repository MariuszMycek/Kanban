/**
 * Main store function
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// let DevTools;
// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line global-require
//   DevTools = require('../../../../kanban-MERN/client/modules/App/components/DevTools').default;
// }

// export function configureStore(initialState = {}) {
//   // Middleware and store enhancers
//   const enhancers = [applyMiddleware(thunk), composeWithDevTools()];

//   // if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
//   //   // Enable DevTools only when rendering on client and during development.
//   //   enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
//   // }

//   const store = createStore(rootReducer, initialState, compose(...enhancers));

//   // For hot reloading reducers
//   // if (module.hot) {
//   //   // Enable Webpack hot module replacement for reducers
//   //   module.hot.accept('./reducers', () => {
//   //     const nextReducer = require('./reducers').default; // eslint-disable-line global-require
//   //     store.replaceReducer(nextReducer);
//   //   });
//   // }
//   return store;
// }
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const makeStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export default makeStore;
