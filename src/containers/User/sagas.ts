import * as constants from './constants';
import * as actions from './actions';
import * as types from './types';
import { takeEvery, call, put } from 'redux-saga/effects';
import { showNotification } from '../../helpers/notification';
import i18n from '../../locales/i18n';
import { getToken } from '../../helpers/tokenCookie';

function* fetchUserProfileFromAPI(action: types.IGetUserProfileRequest) {
  const endpoint = `https://235.ip-51-91-9.eu/users/${action.id}`;

  try {
    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const user = yield response.json();
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.getUserProfileSuccessed(user));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.getUserProfileFailed('Error while User Profile request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later'));
  }
}

function* mainSaga() {
  yield takeEvery(constants.FETCH_USER_PROFILE_REQUEST, fetchUserProfileFromAPI);
}

export default mainSaga;
