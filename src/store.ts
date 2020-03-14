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
import currentOfferReducer from './containers/Offers/reducers';
import SignUpUserSaga from './containers/Registration/sagas';
import GuideProfileSaga from './containers/GuideProfile/sagas';
import { IRegisterStore } from './containers/Registration/types';
import tripBrowser from './containers/TripBrowser/reducers';
import guideProfile from './containers/GuideProfile/reducer';
import adminPanel from './containers/AdminPanel/reducer';
import adminPanelSaga from './containers/AdminPanel/sagas';
import tripBrowserSaga from './containers/TripBrowser/sagas';
import offerSaga from './containers/Offers/sagas';
import userSaga from './containers/User/sagas';
import user from './containers/User/reducer';
import { IMultiTripsAndTagsType, ISingleTripType } from './containers/TripBrowser/types';
import { IGuideProfileComplete } from './containers/GuideProfile/types';
import { IMultiGuideRequests } from './containers/AdminPanel/types';
import { IUserProfiles } from './containers/User/types';
import { IUserData } from './shared/types';

interface IActiveOffer {
  id: number;
  message: string;
  offer: ISingleTripType;
  plannedDate: Date;
  traveler: IUserData;
}

interface ICurrentOffer {
  offer: ISingleTripType;
  activeOffers: IActiveOffer[];
}

export interface StoreType {
  registration: IRegisterStore;
  profile: IProfileData;
  guideProfile: IGuideProfileComplete;
  user: IUserProfiles;
  tripBrowser: IMultiTripsAndTagsType;
  adminPanel: IMultiGuideRequests;
  currentOfferReducer: ICurrentOffer;
  activeOffers: ISingleTripType[];
}

function* rootSaga() {
  yield all([SignUpUserSaga(), logInUserSaga(), tripBrowserSaga(), adminPanelSaga(), offerSaga(), userSaga(), GuideProfileSaga()]);
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['registration', 'tripBrowser', 'currentOffer', 'currentOfferReducer']
};

export let persistor: Persistor;
export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({ registration, profile, user, guideProfile, tripBrowser, adminPanel, currentOfferReducer });
  let persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return store;
};
