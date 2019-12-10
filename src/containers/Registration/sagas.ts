import { call, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_UP_USER_FAILED,
  SIGN_UP_USER_REQUESTED,
  SIGN_UP_USER_SUCCESSED
} from "./constants";
import history from "../../history";

const forwardTo = (location: string) => {
  history.push(location);
};

function* signUpUser() {
  try {
    const userData = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/todos"
    );
    yield userData.json();
    yield put({
      type: SIGN_UP_USER_SUCCESSED,
      user: {
        firstName: "Janusz",
        lastName: "Tracz",
        country: "Polska",
        email: "abc@gmail.com",
        tel: "123456789",
        gender: "male",
        experience: 1
      }
    });
    yield call(forwardTo, "/register/edit");
  } catch {
    yield put({
      type: SIGN_UP_USER_FAILED,
      message: "Something goes wrong in signing up"
    });
  }
}

function* mainSaga() {
  yield takeLatest(SIGN_UP_USER_REQUESTED, signUpUser);
}

export default mainSaga;
