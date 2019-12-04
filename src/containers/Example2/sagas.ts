import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USERS_FAILED, FETCH_USERS_REQUESTED, FETCH_USERS_SUCCESSED } from './constants';

function* fetchUsers() {
  try {
    const usersList = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
    const json = yield usersList.json();
    yield put({
      type: FETCH_USERS_SUCCESSED,
      users: json
    });
  } catch {
    yield put({
      type: FETCH_USERS_FAILED,
      message: 'Something goes wrong in fetch to api'
    });
  }
}

function* mainSaga() {
  yield takeLatest(FETCH_USERS_REQUESTED, fetchUsers);
}

export default mainSaga;
