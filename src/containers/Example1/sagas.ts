import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_TASKS_FAILED, FETCH_TASKS_REQUESTED, FETCH_TASKS_SUCCESSED } from './constants';

function* fetchTodo() {
  try {
    const todoList = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos');
    const json = yield todoList.json();
    yield put({
      type: FETCH_TASKS_SUCCESSED,
      tasks: json
    });
  } catch {
    yield put({
      type: FETCH_TASKS_FAILED,
      message: 'Something goes wrong in fetch to api'
    });
  }
}

function* mainSaga() {
  yield takeLatest(FETCH_TASKS_REQUESTED, fetchTodo);
}

export default mainSaga;
