import { call, put, takeLatest } from 'redux-saga/effects';
import { initTokenCookie, setToken } from '../../helpers/tokenCookie';
import history from '../../history';
import * as actions from './actions';
import * as constants from './constants';
import * as types from './types';
import { NotificationManager } from 'react-notifications';

const forwardTo = (location: string) => {
  history.push(location);
};

const logInGoogleEndpoint = 'https://8.ip-164-132-53.eu/auth/google/login';

function* logInGoogle(action: types.ILogInGoogleRequest) {
  try {
    const response = yield call(fetch, logInGoogleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: action.code,
        request: window.location.origin
      })
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      const templateUser = {
        firstName: 'Wojciech',
        lastName: 'Glugla',
        country: 'Poland',
        email: 'gluglawojciech@gmail.com',
        tel: '123456789',
        gender: 'Male',
        experience: 5
      };
      const token = json.token;
      yield put(actions.logInGoogleSuccessed(templateUser));
      yield initTokenCookie(token);
      NotificationManager.success('Zalogowano pomyślnie!');
      yield call(forwardTo, '/profile');
    } else {
      throw new Error();
    }
  } catch {
    NotificationManager.error('Spróbuj ponownie później', 'Coś poszło nie tak!');
    yield put(actions.logInGoogleFailed());
  }
}

function* logOutGoogle() {
  try {
    yield put(actions.logOutGoogleSuccessed());
    yield setToken('');
    NotificationManager.success('Zostaniesz przeniesiony na stronę główną', 'Wylogowanie przebiegło pomyślnie!');
    yield call(forwardTo, '/');
  } catch {
    NotificationManager.error('Spróbuj ponownie później', 'Coś poszło nie tak!');
    yield put(actions.logOutGoogleFailed());
  }
}

function* mainSaga() {
  yield takeLatest(constants.LOG_IN_GOOGLE_REQUESTED, logInGoogle);
  yield takeLatest(constants.LOG_OUT_GOOGLE_REQUESTED, logOutGoogle);
}

export default mainSaga;
