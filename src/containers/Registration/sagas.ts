import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_GOOGLE_REQUESTED, CONFIRM_SIGN_UP_REQUESTED, GET_INTERESTS_REQUESTED } from './constants';
import { logInGoogleSuccessed } from '../Login/actions';

import history from '../../history';
import * as actions from './actions';
import { IConfirmSignUpRequest, ISignUpGoogleRequest } from './types';
import i18n from '../../locales/i18n';
import { initTokenCookie } from '../../helpers/tokenCookie';
import { showNotification } from '../../helpers/notification';

const forwardTo = (location: string) => {
  history.push(location);
};

const signUpGoogleEndpoint = `https://8.ip-164-132-53.eu/auth/google/register`;
const confirmGoogleEndpoint = `https://8.ip-164-132-53.eu/auth/google/register/confirm`;
const interestsEndpoint = `https://8.ip-164-132-53.eu/interests`;

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
        telephone: '',
        gender: 'Female',
        experience: 'NOVICE'
      };
      yield put(
        actions.signUpGoogleSuccessed({
          user: templateUser,
          registerToken: json.authorizationToken
        })
      );
      yield call(forwardTo, '/register');
      showNotification('success', i18n.t('Verification successed!'), i18n.t('Complete your data to finish registration process.'));
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
    showNotification('danger', i18n.t('Verification failed!'), i18n.t(error.message));
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
      showNotification('danger', i18n.t('Validation successed!'), '');
    } else {
      throw new Error('Unexpected error while confirming Google registration');
    }
  } catch (error) {
    showNotification('danger', i18n.t('Validation error!'), i18n.t(error.message));
    yield put(actions.confirmSignUpFailed());
  }
}

function* getInterests() {
  try {
    const response = yield call(fetch, interestsEndpoint);
    const json = yield response.json();
    yield put(actions.getInterestsSuccessed(json));
  } catch (error) {
    yield put(actions.getInterestsFailed());
  }
}

function* mainSaga() {
  yield takeLatest(SIGN_UP_GOOGLE_REQUESTED, signUpGoogleUser);
  yield takeLatest(CONFIRM_SIGN_UP_REQUESTED, confirmGoogleUser);
  yield takeLatest(GET_INTERESTS_REQUESTED, getInterests);
}

export default mainSaga;
