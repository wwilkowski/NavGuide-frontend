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
import { GuideProfileReducer, TripBrowserReducer } from './containers/TripBrowser/reducers';
import adminPanel from './containers/AdminPanel/reducer';
import adminPanelSaga from './containers/AdminPanel/sagas';
import tripBrowserSaga from './containers/TripBrowser/sagas';
import offerSaga from './containers/Offers/sagas';
import userSaga from './containers/User/sagas';
import user from './containers/User/reducer';
import { IMultiTripsAndTagsType, IGuideProfile, IGuideProfileComplete } from './containers/TripBrowser/types';
import { IMultiGuideRequests } from './containers/AdminPanel/types';
import { IUserProfiles } from './containers/User/types';

export interface StoreType {
  registration: IRegisterStore;
  profile: IProfileData;
  guideProfile: IGuideProfileComplete;
  user: IUserProfiles;
  tripBrowser: IMultiTripsAndTagsType;
  adminPanel: IMultiGuideRequests;
}

function* rootSaga() {
  yield all([SignUpUserSaga(), logInUserSaga(), tripBrowserSaga(), adminPanelSaga(), offerSaga(), userSaga()]);
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['registration', 'tripBrowser']
};

const tripBrowser = TripBrowserReducer;
const guideProfile = GuideProfileReducer;

export let persistor: Persistor;
export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ registration, profile, user, guideProfile, tripBrowser, adminPanel });
  let persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return store;
};
