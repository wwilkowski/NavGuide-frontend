import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_GOOGLE_USER_REQUESTED, SIGN_UP_REQUESTED } from './constants';

import history from '../../history';
import * as actions from './actions';
import { SignUpRequest, SignUpGoogleRequest } from './types';
import { NotificationManager } from 'react-notifications';
import i18n from '../../locales/i18n';

const forwardTo = (location: string) => {
  history.push(location);
};

const signUpGoogleEndpoint = `http://tarajki.tk:8123/auth/google/register`;

function* signUpGoogleUser(action: SignUpGoogleRequest) {
  try {
    const userData = yield call(fetch, signUpGoogleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: `${action.code}`
      })
    });
    const json = yield userData.json();

    const templateUser = {
      firstName: json.firstName,
      lastName: json.lastName,
      country: json.country,
      email: json.email,
      tel: '',
      gender: 'Male',
      experience: 1
    };
    yield put(actions.signUpGoogleUserSuccessed(templateUser));
    yield call(forwardTo, '/register');
    yield NotificationManager.success(i18n.t('Uzupełnij swój profil, aby zakończyć rejestrację'), i18n.t('Verification successed'));
  } catch {
    yield put(actions.signUpGoogleUserFailed());
    yield NotificationManager.error(i18n.t('Something goes wrong.! Try again later.'), i18n.t('Verification failed'));
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
