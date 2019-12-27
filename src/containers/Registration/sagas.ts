import { call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from '../../helpers/notification';
import { initTokenCookie } from '../../helpers/tokenCookie';
import { forwardTo } from '../../history';
import i18n from '../../locales/i18n';
import { logInGoogleSuccessed } from '../Profile/actions';
import * as actions from './actions';
import * as constants from './constants';
import * as types from './types';

const signUpGoogleEndpoint = `https://8.ip-164-132-53.eu/auth/google/register`;
const confirmGoogleEndpoint = `https://8.ip-164-132-53.eu/auth/google/register/confirm`;
const interestsEndpoint = `https://8.ip-164-132-53.eu/interests`;

function* signUpGoogleUser(action: types.ISignUpGoogleRequest) {
  try {
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
          templateUser: templateUser,
          registerToken: json.authorizationToken
        })
      );
      showNotification('success', i18n.t('Verification successed!'), i18n.t('Complete your data to finish registration process.'));
      yield call(forwardTo, '/register');
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

function* confirmGoogleUser(action: types.IConfirmSignUpRequest) {
  try {
    const response = yield call(fetch, confirmGoogleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${action.token}`
      },
      body: JSON.stringify({
        ...action.templateUser
      })
    });
    const { firstName, lastName, country, email, experience, telephone, avatar, interests, role, token } = yield response.json();
    const user = {
      firstName,
      lastName,
      email,
      country,
      experience,
      telephone,
      avatar,
      interests,
      role
    };
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.confirmSignUpSuccessed(token));
      yield initTokenCookie(token);
      yield put(logInGoogleSuccessed(user));
      showNotification('success', i18n.t('Validation successed!'), i18n.t('You are logged in!'));
      if (action.toBeGuide) {
        showNotification('info', i18n.t('You want to be guide'), i18n.t('Complete your data to declare to be a guide!'));
        yield call(forwardTo, '/register/guide');
      } else {
        yield call(forwardTo, '/profile');
      }
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
  yield takeLatest(constants.SIGN_UP_GOOGLE_REQUESTED, signUpGoogleUser);
  yield takeLatest(constants.CONFIRM_SIGN_UP_REQUESTED, confirmGoogleUser);
  yield takeLatest(constants.GET_INTERESTS_REQUESTED, getInterests);
}

export default mainSaga;
