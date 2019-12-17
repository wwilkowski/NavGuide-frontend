import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_GOOGLE_REQUESTED, CONFIRM_SIGN_UP_REQUESTED } from './constants';
import { logInGoogleSuccessed } from '../Login/actions';

import history from '../../history';
import * as actions from './actions';
import { IConfirmSignUpRequest, ISignUpGoogleRequest } from './types';
import { NotificationManager } from 'react-notifications';
import i18n from '../../locales/i18n';
import { initTokenCookie } from '../../helpers/tokenCookie';

const forwardTo = (location: string) => {
  history.push(location);
};

const signUpGoogleEndpoint = `https://8.ip-164-132-53.eu/auth/google/register`;
const confirmGoogleEndpoint = `https://8.ip-164-132-53.eu/auth/google/register/confirm`;

function* signUpGoogleUser(action: ISignUpGoogleRequest) {
  try {
    console.log(window.location.host);
    const response = yield call(fetch, signUpGoogleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: `${action.code}`,
        request: window.location.origin
      })
    });
    const status = response.status;
    const json = yield response.json();
    if (status >= 200 && status <= 300) {
      const templateUser = {
        firstName: json.firstName,
        lastName: json.lastName,
        country: json.country,
        email: json.email,
        tel: '',
        gender: 'Male',
        experience: 1
      };
      yield put(
        actions.signUpGoogleSuccessed({
          user: templateUser,
          registerToken: json.authorizationToken
        })
      );
      yield call(forwardTo, '/register');
      yield NotificationManager.success(i18n.t('Complete your data to finish registration process.'), i18n.t('Verification successed!'));
    } else {
      switch (json.status) {
        case 409:
          throw new Error('User already exists! Try to log in.');
        default:
          throw new Error('Unexpected problem.');
      }
    }
  } catch (error) {
    yield put(actions.signUpGoogleFailed());
    yield NotificationManager.error(i18n.t(error.message), i18n.t('Verification failed!'));
  }
}

function* confirmGoogleUser(action: IConfirmSignUpRequest) {
  try {
    const response = yield call(fetch, confirmGoogleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${action.token}`
      },
      body: JSON.stringify({
        ...action.user
      })
    });
    const json = yield response.json();
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.confirmSignUpSuccessed(json));
      yield initTokenCookie(json.token);
      yield put(logInGoogleSuccessed(action.user));
      yield call(forwardTo, '/');
      yield NotificationManager.success(i18n.t('Verification successed!'));
    } else {
      throw new Error('Unexpected error while confirming Google registration');
    }
  } catch (error) {
    yield NotificationManager.error(i18n.t(error.message), i18n.t('Validation error!'));
    yield put(actions.confirmSignUpFailed());
  }
}

function* mainSaga() {
  yield takeLatest(SIGN_UP_GOOGLE_REQUESTED, signUpGoogleUser);
  yield takeLatest(CONFIRM_SIGN_UP_REQUESTED, confirmGoogleUser);
}

export default mainSaga;
