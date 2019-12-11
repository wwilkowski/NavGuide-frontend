import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_GOOGLE_USER_REQUESTED, SIGN_UP_REQUESTED } from './constants';

import history from '../../history';
import * as actions from './actions';
import { SignUpRequest } from './types';

const forwardTo = (location: string) => {
  history.push(location);
};

function* signUpGoogleUser() {
  try {
    const userData = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos');
    yield userData.json();
    const templateUser = {
      firstName: 'Wojciech',
      lastName: 'Glugla',
      country: 'Poland',
      email: 'gluglawojciech@gmail.com',
      tel: '123456789',
      gender: 'Male',
      experience: 5
    };
    yield put(actions.signUpGoogleUserSuccessed(templateUser));
    yield call(forwardTo, '/register');
  } catch {
    yield put(actions.signUpGoogleUserFailed());
  }
}

function* signUpUser(action: SignUpRequest) {
  try {
    const signUpResponse = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos');
    yield signUpResponse.json();
    const templateResponse = {
      user: {
        firstName: 'Wojciech',
        lastName: 'Glugla',
        country: 'Poland',
        email: 'gluglawojciech@gmail.com',
        tel: '123456789',
        gender: 'Male',
        experience: 5
      },
      token: 'template_token123'
    };
    yield put(actions.signUpSuccessed(templateResponse));
    yield call(forwardTo, '/register');
  } catch {
    yield put(actions.signUpFailed());
  }
}

function* mainSaga() {
  yield takeLatest(SIGN_UP_REQUESTED, signUpUser);
  yield takeLatest(SIGN_UP_GOOGLE_USER_REQUESTED, signUpGoogleUser);
}

export default mainSaga;
