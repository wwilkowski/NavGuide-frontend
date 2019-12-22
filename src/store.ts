import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import profile from './containers/Profile/reducer';
import logInUserSaga from './containers/Profile/sagas';
import { IProfileData } from './containers/Profile/types';
import registration from './containers/Registration/reducer';
import SignUpUserSaga from './containers/Registration/sagas';
import { IRegisterStore } from './containers/Registration/types';

export interface StoreType {
  registration: IRegisterStore;
  profile: IProfileData;
}

function* rootSaga() {
  yield all([SignUpUserSaga(), logInUserSaga()]);
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['registration']
};

export let persistor: Persistor;
export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ registration, profile });
  let persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return store;
};
