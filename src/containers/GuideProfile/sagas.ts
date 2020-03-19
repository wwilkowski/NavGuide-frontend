import {
  FETCH_GUIDE_PROFILE_REQUESTED,
  FETCH_GUIDE_PROFILE_DATA_REQUESTED,
  FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED,
  FETCH_GUIDE_HISTORY_REQUESTED
} from './constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import * as actions from './actions';
import i18n from '../../locales/i18n';
import { showNotification } from '../../helpers/notification';
import { getToken } from '../../helpers/tokenCookie';

function* fetchGuideProfileFromAPI(action: types.IFetchGuideProfileRequest) {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/guides/${action.id}`;
    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    const guideProfile = yield response.json();
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.fetchGuideProfileSuccessed(guideProfile));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.fetchGuideProfileFailed('Error while Guide Profile request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
  }
}

function* fetchGuideProfileDataFromAPI(action: types.IFetchGuideProfileRequest) {
  try {
    console.log(action.id);
    const endpoint = `https://235.ip-51-91-9.eu/users/${action.id}`;

    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    const user = yield response.json();
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.fetchGuideProfileDataSuccessed(user));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.fetchGuideProfileDataFailed('Error while User Profile request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
  }
}

function* fetchGuideActiveOffersFromAPI(action: types.IFetchGuideActiveOffersRequest) {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/guides/${action.id}/offers`;

    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    const activeOffers = yield response.json();

    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.fetchGuideActiveOffersSuccessed(activeOffers));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.fetchGuideActiveOffersFailed('Error while Guide Active Offers request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
  }
}

function* fetchGuideHistoryFromAPI(action: types.IFetchGuideHistoryRequest) {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/guides/${action.id}/history`;

    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    const verifiedOffers = yield response.json();

    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.fetchGuideHistorySuccessed(verifiedOffers));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.fetchGuideHistoryFailed('Error while Guide History Offers request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
  }
}

function* mainSaga() {
  yield takeLatest(FETCH_GUIDE_PROFILE_REQUESTED, fetchGuideProfileFromAPI);
  yield takeLatest(FETCH_GUIDE_PROFILE_DATA_REQUESTED, fetchGuideProfileDataFromAPI);
  yield takeLatest(FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED, fetchGuideActiveOffersFromAPI);
  yield takeLatest(FETCH_GUIDE_HISTORY_REQUESTED, fetchGuideHistoryFromAPI);
}
export default mainSaga;
