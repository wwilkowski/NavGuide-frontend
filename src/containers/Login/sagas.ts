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

function* logInGoogle(action: types.ILogInGoogleRequest) {
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
    NotificationManager.success('Zalogowano pomyślnie!');
    yield call(forwardTo, '/profile');
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
