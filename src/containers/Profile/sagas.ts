import { call, put, takeLatest } from 'redux-saga/effects';
import { getToken } from '../../helpers/tokenCookie';
import * as actions from './actions';
import * as constants from './constants';

const tempEndpoint = 'https://8.ip-164-132-53.eu/profile';

function* tempSaga() {
  try {
    const token = getToken();
    const response = yield call(fetch, tempEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      yield put(actions.templateSuccessed(json.firstName));
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.log('ERROR', error);
  }
}

function* mainSaga() {
  yield takeLatest(constants.TEMP_REQUESTED, tempSaga);
}

export default mainSaga;
