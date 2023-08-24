import { createStore, applyMiddleware, compose } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const promise = createPromise({ types: { fulfilled: 'success' } });
applyMiddleware(promise);
const middlewares = [createPromise(), thunk];

if (__DEV__) { // eslint-disable-line
  // middlewares.push(createLogger());
}

export default createStore(reducers, applyMiddleware(thunk));
