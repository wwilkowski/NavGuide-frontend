import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import registration from "./containers/Registration/reducer";
import login from "./containers/Login/reducer";
import tripBrowser from "./containers/TripBrowser/reducers";
import SignUpUserSaga from "./containers/Registration/sagas";
import logInUserSaga from "./containers/Login/sagas";
import tripBrowserSaga from "./containers/TripBrowser/sagas";
import { all } from "redux-saga/effects";
import { RegistrationDataType } from "./containers/Registration/types";
import { LoginDataType } from "./containers/Login/types";
import { IMultiTripsAndTagsType } from "./containers/TripBrowser/types";

export interface StoreType {
  registration: RegistrationDataType;
  login: LoginDataType;
  tripBrowser: IMultiTripsAndTagsType;
}

function* rootSaga() {
  yield all([SignUpUserSaga(), logInUserSaga(), tripBrowserSaga()]);
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ registration, login, tripBrowser });
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
