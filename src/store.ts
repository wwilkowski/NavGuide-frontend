import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import registration from './containers/Registration/reducer';
import login from './containers/Login/reducer';
import SignUpUserSaga from './containers/Registration/sagas';
import logInUserSaga from './containers/Login/sagas';
import { all } from 'redux-saga/effects';
import { RegistrationDataType } from './containers/Registration/types';
import { LoginDataType } from './containers/Login/types';

export interface StoreType {
  registration: RegistrationDataType;
  login: LoginDataType;
}

function* rootSaga() {
  yield all([SignUpUserSaga(), logInUserSaga()]);
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ registration, login });
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};
