import { call, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN_GOOGLE_REQUESTED } from './constants';
import * as actions from './actions';
import history from '../../history';
import { LogInGoogleRequest } from './types';
import { initTokenCookie, getToken } from '../../helpers/tokenCookie';

const forwardTo = (location: string) => {
  history.push(location);
};

function* logInGoogle(action: LogInGoogleRequest) {
  try {
    const loginData = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos');
    yield loginData.json();
    const templateUser = {
      firstName: 'Wojciech',
      lastName: 'Glugla',
      country: 'Poland',
      email: 'gluglawojciech@gmail.com',
      tel: '123456789',
      gender: 'Male',
      experience: 5
    };
    const templateToken = 'token123';
    yield put(actions.logInGoogleSuccessed(templateUser));
    yield initTokenCookie(templateToken);
    console.log('token', getToken());
    yield call(forwardTo, '/dashboard');
  } catch {
    yield put(actions.logInGoogleFailed());
  }
}

function* mainSaga() {
  yield takeLatest(LOG_IN_GOOGLE_REQUESTED, logInGoogle);
}

export default mainSaga;
