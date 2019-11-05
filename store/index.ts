import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReduser from './reducers';
import rootSaga from './sagas';

export const makeStore = (initialState, options) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  // Before we returned the created store without assigning it to a variable:
  // return createStore(reducer, initialState);

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(rootReduser, initialState, applyMiddleware(sagaMiddleware));
 
  // 3: Run your sagas:
  sagaMiddleware.run(rootSaga);
  
  // 4: now return the store:
  return store
};