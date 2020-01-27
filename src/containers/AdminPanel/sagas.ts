import * as types from './types';
import * as constants from './constants';
import * as actions from './actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getToken } from '../../helpers/tokenCookie';
import { showNotification } from '../../helpers/notification';
import i18n from '../../locales/i18n';

const fetchGuideRequestsEndpoint = `https://235.ip-51-91-9.eu/guiderequests`;
const settleGuideRequestEndpoint = `https://235.ip-51-91-9.eu/guiderequests/`;

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

function* settleGuideRequest(action: types.ISettleGuideRequest) {
  const endpoint = settleGuideRequestEndpoint + action.data.id;
  try {
    const response = yield call(fetch, endpoint, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorisation: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        message: action.data.message,
        guideRequestStatus: action.data.status
      })
    });

    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.getGuideRequestsRequest());
      showNotification('success', i18n.t('Guide request settled!'), i18n.t('Guide requests are up to data'));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(actions.settleGuideRequestFailed('Error while settle guide request'));
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
  }
}

function* mainSaga() {
  yield takeLatest(constants.GET_GUIDE_REQUESTS, fetchGuideRequestsFromAPI);
  yield takeLatest(constants.SETTLE_GUIDE_REQUEST, settleGuideRequest);
}

export default mainSaga;
