import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import user from './containers/Registration/reducer';

import SignUpUserSaga from './containers/Registration/sagas';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([SignUpUserSaga()]);
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ user });
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};
