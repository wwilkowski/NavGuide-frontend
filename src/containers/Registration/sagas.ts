import { call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from '../../helpers/notification';
import { initTokenCookie, getToken } from '../../helpers/tokenCookie';
import { forwardTo } from '../../history';
import i18n from '../../locales/i18n';
import { logInGoogleSuccessed } from '../Profile/actions';
import * as actions from './actions';
import * as constants from './constants';
import * as types from './types';

const signUpGoogleEndpoint = `https://235.ip-51-91-9.eu/auth/google/register`;
const confirmGoogleEndpoint = `https://235.ip-51-91-9.eu/auth/google/register/confirm`;
const interestsEndpoint = `https://235.ip-51-91-9.eu/interests`;
const registerGuideEndpoint = 'https://235.ip-51-91-9.eu/guiderequests';
const guideInfoEndpoint = 'https://235.ip-51-91-9.eu/profile/guideRequests';

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
        id: -1,
        avatar: '',
        role: '',
        firstName: json.firstName,
        lastName: json.lastName,
        country: json.country,
        email: json.email,
        telephone: '',
        gender: json.gender,
        age: json.age,
        experience: 1,
        interests: []
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
    const {
      id,
      firstName,
      lastName,
      country,
      email,
      experience,
      telephone,
      avatar,
      interests,
      role,
      token,
      gender,
      age
    } = yield response.json();
    const user = {
      id,
      firstName,
      lastName,
      email,
      country,
      experience,
      telephone,
      avatar,
      interests,
      role,
      gender,
      age
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

function* registerGuide(action: types.ISendRegisterGuideRequest) {
  try {
    const response = yield call(fetch, registerGuideEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        languages: action.guideValues.languages,
        experience: action.guideValues.experience,
        description: action.guideValues.description
      })
    });

    if (response.status >= 200 && response.status <= 300) {
      showNotification('success', i18n.t('Success!'), i18n.t('Guide request sent!'));

      yield call(forwardTo, '/profile');
    } else {
      throw new Error('Unexpected error while sending register guide request');
    }
  } catch (error) {
    showNotification('danger', i18n.t('Failed to send request!'), i18n.t(error.message));
  }
}

function* getGuideInfo() {
  try {
    const response = yield call(fetch, guideInfoEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      yield put(actions.getGuideInfoSuccessed(json));
    } else {
      yield put(actions.getInterestsFailed());
      throw new Error(i18n.t('Unexpected error while checking guide requests'));
    }
  } catch (error) {
    showNotification('danger', i18n.t('Failed to get guide requests!'), i18n.t(error.message));
  }
}

function* mainSaga() {
  yield takeLatest(constants.SIGN_UP_GOOGLE_REQUESTED, signUpGoogleUser);
  yield takeLatest(constants.CONFIRM_SIGN_UP_REQUESTED, confirmGoogleUser);
  yield takeLatest(constants.GET_INTERESTS_REQUESTED, getInterests);
  yield takeLatest(constants.SEND_REGISTER_GUIDE_REQUEST, registerGuide);
  yield takeLatest(constants.GET_GUIDE_INFO_REQUEST, getGuideInfo);
}

export default mainSaga;
