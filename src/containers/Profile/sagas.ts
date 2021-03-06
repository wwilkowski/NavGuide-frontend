import { call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from '../../helpers/notification';
import { initTokenCookie, setToken, getToken } from '../../helpers/tokenCookie';
import { forwardTo } from '../../history';
import i18n from '../../locales/i18n';
import * as actions from './actions';
import * as constants from './constants';
import * as types from './types';

const logInGoogleEndpoint = 'https://235.ip-51-91-9.eu/auth/google/login';
const profileEndpoint = 'https://235.ip-51-91-9.eu/profile';
const avatarEndpoint = 'https://235.ip-51-91-9.eu/profile/avatar';
const oneSignalEndpoint = 'https://235.ip-51-91-9.eu/profile/push';

function* logInGoogle(action: types.ILogInGoogleRequest) {
  try {
    const response = yield call(fetch, logInGoogleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: action.code,
        request: window.location.origin,
      }),
    });
    if (response.status >= 200 && response.status <= 300) {
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
        age,
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
        age,
      };
      yield put(actions.logInGoogleSuccessed(user));
      yield initTokenCookie(token);
      yield sendOneSignalId(localStorage.getItem('one_signal_id') || '');
      showNotification('success', i18n.t('Logged in successfully'), '...');
      yield call(forwardTo, '/profile');
    } else {
      if (response.status === 401) {
        throw new Error('User does not exist');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (e) {
    showNotification('danger', i18n.t(`${e.message}`), i18n.t('Try again later'));
    yield put(actions.logInGoogleFailed());
  }
}

function* sendOneSignalId(oneSignalId: string) {
  try {
    yield call(fetch, oneSignalEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        oneSignalId,
      }),
    });
  } catch (e) {
    console.error(e);
  }
}

function* logOutGoogle() {
  try {
    yield put(actions.logOutGoogleSuccessed());
    yield call(forwardTo, '/');
    yield setToken('');
    showNotification('success', i18n.t('Logged out successfully'), i18n.t('You will be taken to the main page'));
  } catch {
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later!'));
    yield put(actions.logOutGoogleFailed());
  }
}

function* editProfile(action: types.IEditProfileAction) {
  try {
    const response = yield call(fetch, profileEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify({
        country: action.editUser.country,
        email: action.editUser.email,
        experience: action.editUser.experience,
        firstName: action.editUser.firstName,
        interests: action.editUser.interests,
        lastName: action.editUser.lastName,
        telephone: action.editUser.telephone,
        gender: action.editUser.gender,
        age: action.editUser.age,
      }),
    });

    if (response.status >= 200 && response.status <= 300) {
      const { id, country, email, experience, firstName, interests, lastName, telephone, gender, age } = yield response.json();

      const user = {
        id: id,
        avatar: action.user.avatar,
        role: action.user.role,
        firstName,
        lastName,
        country,
        email,
        telephone,
        gender: gender,
        experience,
        interests,
        age,
      };
      yield put(actions.editProfileSuccessed(user));
      showNotification('success', i18n.t('Profile was edit'), i18n.t('Your profile is up to data'));
      yield call(forwardTo, '/profile');
    } else {
      if (response.status === 401) {
        throw new Error('User does not exist!');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    showNotification('danger', i18n.t('Something goes wrong'), i18n.t('Try again later'));
    yield put(actions.editProfileFailed());
  }
}

function* getProfile() {
  try {
    const response = yield call(fetch, profileEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status >= 200 && response.status <= 300) {
      const {
        id,
        country,
        email,
        experience,
        firstName,
        interests,
        lastName,
        telephone,
        avatar,
        role,
        gender,
        age,
      } = yield response.json();
      const user = {
        id,
        avatar,
        role,
        firstName,
        lastName,
        country,
        email,
        telephone,
        gender,
        experience,
        interests,
        age,
      };
      yield put(actions.getProfileSuccessed(user));
    } else {
      if (response.status === 401) {
        yield put(actions.getProfileFailed());
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.getProfileFailed());
  }
}

function* sendAvatar(action: types.ISendAvatarAction) {
  const formData = new FormData();
  formData.append('file', action.file);
  try {
    const response = yield call(fetch, avatarEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.sendAvatarSuccessed());
      yield put(actions.getProfileRequest());
      // yield call(refresh, '/profile/edit');
    } else {
      if (response.status === 401) {
        throw new Error('You are not logged in');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.sendAvatarFailed());
  }
}

function* getProfileHistory(action: types.IGetProfileHistoryOffersRequest) {
  try {
    //GDY ID = -1 TO POBIERA HISTORIE OFERT SWOJEGO PROFILU
    const endpointProfile = `https://235.ip-51-91-9.eu/profile/history`;
    const endpointProfileById = `https://235.ip-51-91-9.eu/users/${action.userId}/history`;
    let response;
    if (action.userId === -1) {
      response = yield call(fetch, endpointProfile, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
    } else {
      response = yield call(fetch, endpointProfileById);
    }

    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      yield put(actions.getProfileHistorySuccessed(json));
    } else {
      throw new Error('Something goes wrong');
    }
  } catch (error) {
    console.error(error);
  }
}

function* getOwnFeedbacks() {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/profile/feedbacks`;
    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const feedbacks = yield response.json();

    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.getOwnFeedbacksSuccessed(feedbacks));
    } else if (response.status === 401) {
      throw new Error('You are not logged in');
    } else {
      throw new Error('Something goes wrong');
    }
  } catch (error) {
    console.error(error);
  }
}

function* mainSaga() {
  yield takeLatest(constants.LOG_IN_GOOGLE_REQUESTED, logInGoogle);
  yield takeLatest(constants.LOG_OUT_GOOGLE_REQUESTED, logOutGoogle);
  yield takeLatest(constants.EDIT_PROFILE_REQUESTED, editProfile);
  yield takeLatest(constants.GET_PROFILE_REQUESTED, getProfile);
  yield takeLatest(constants.SEND_AVATAR_REQUESTED, sendAvatar);
  yield takeLatest(constants.GET_PROFILE_HISTORY_OFFERS_REQUESTED, getProfileHistory);
  yield takeLatest(constants.GET_OWN_FEEDBACKS_REQUESTED, getOwnFeedbacks);
}

export default mainSaga;
