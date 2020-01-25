import * as types from './types';
import * as constants from './constants';
import * as actions from './actions';
import { takeLatest, call, put } from 'redux-saga/effects';

const fetchGuideRequestsEndpoint = `https://235.ip-51-91-9.eu/guiderequests`;

function* fetchGuideRequestsFromAPI() {
  try {
    const response = yield call(fetch, fetchGuideRequestsEndpoint);
    const guideRequests = yield response.json();
    //nie trzeba filtrowac, API zwraca tylko status PENDINGs
    yield put(actions.getGuideRequestsSuccessed(guideRequests));
  } catch {
    yield put(actions.getGuideRequestsFailed('Error while fetching guide requests from API!'));
  }
}

function* mainSaga() {
  yield takeLatest(constants.GET_GUIDE_REQUESTS, fetchGuideRequestsFromAPI);
}

export default mainSaga;
