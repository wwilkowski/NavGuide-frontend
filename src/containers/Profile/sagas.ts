import { call, put, takeLatest } from 'redux-saga/effects';
import { getToken } from '../../helpers/tokenCookie';
import * as actions from './actions';
import * as constants from './constants';

const tempEndpoint = 'http://tarajki.tk:8123/profile';

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
    const json = yield response.json();
    yield put(actions.templateSuccessed(json.firstName));
  } catch (error) {
    console.log('ERROR', error);
  }
}

function* mainSaga() {
  yield takeLatest(constants.TEMP_REQUESTED, tempSaga);
}

export default mainSaga;
