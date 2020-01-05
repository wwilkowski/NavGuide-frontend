import { call, put, takeLatest } from "redux-saga/effects";
import { showNotification } from "../../helpers/notification";
import { initTokenCookie, setToken, getToken } from "../../helpers/tokenCookie";
import { forwardTo } from "../../history";
import i18n from "../../locales/i18n";
import * as actions from "./actions";
import * as constants from "./constants";
import * as types from "./types";

const logInGoogleEndpoint = "https://235.ip-51-91-9.eu/auth/google/login";
const editProfileEndpoint = "https://235.ip-51-91-9.eu/profile";

function* logInGoogle(action: types.ILogInGoogleRequest) {
  try {
    const response = yield call(fetch, logInGoogleEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: action.code,
        request: window.location.origin
      })
    });
    if (response.status >= 200 && response.status <= 300) {
      const {
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
        gender
      } = yield response.json();
      const user = {
        firstName,
        lastName,
        email,
        country,
        experience,
        telephone,
        avatar,
        interests,
        role,
        gender
      };
      yield put(actions.logInGoogleSuccessed(user));
      yield initTokenCookie(token);
      showNotification("success", i18n.t("Logged in successfully!"), "");
      yield call(forwardTo, "/profile");
    } else {
      if (response.status === 401) {
        throw new Error("User does not exist!");
      } else {
        throw new Error("Something goes wrong");
      }
    }
  } catch (e) {
    showNotification(
      "danger",
      i18n.t(`${e.message}`),
      i18n.t("Try again later!")
    );
    yield put(actions.logInGoogleFailed());
  }
}

function* logOutGoogle() {
  try {
    yield put(actions.logOutGoogleSuccessed());
    yield call(forwardTo, "/");
    yield setToken("");
    showNotification(
      "success",
      i18n.t("Logged out successfully"),
      i18n.t("You will be taken to the main page!")
    );
  } catch {
    showNotification(
      "danger",
      i18n.t("Something goes wrong"),
      i18n.t("Try again later!")
    );
    yield put(actions.logOutGoogleFailed());
  }
}

function* editProfile(action: types.IEditProfileAction) {
  try {
    const response = yield call(fetch, editProfileEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify({
        country: action.editUser.country,
        email: action.editUser.email,
        experience: action.editUser.experience,
        firstName: action.editUser.firstName,
        interests: action.editUser.interests,
        lastName: action.editUser.lastName,
        telephone: action.editUser.telephone,
        gender: action.editUser.gender
      })
    });
    if (response.status >= 200 && response.status <= 300) {
      const {
        country,
        email,
        experience,
        firstName,
        interests,
        lastName,
        telephone,
        gender
      } = yield response.json();

      const user = {
        avatar: action.user.avatar,
        role: action.user.role,
        firstName,
        lastName,
        country,
        email,
        telephone,
        gender: gender,
        experience,
        interests
      };
      yield put(actions.editProfileSuccessed(user));
      showNotification(
        "success",
        i18n.t("Profile was edit!"),
        i18n.t("Your profile is up to data")
      );
      yield call(forwardTo, "/profile");
    } else {
      if (response.status === 401) {
        throw new Error("User does not exist!");
      } else {
        throw new Error("Something goes wrong");
      }
    }
  } catch (error) {
    console.log("ERROR!", error.message);
    showNotification(
      "danger",
      i18n.t("Something goes wrong"),
      i18n.t("Try again later!")
    );
    yield put(actions.editProfileFailed());
  }
}

function* mainSaga() {
  yield takeLatest(constants.LOG_IN_GOOGLE_REQUESTED, logInGoogle);
  yield takeLatest(constants.LOG_OUT_GOOGLE_REQUESTED, logOutGoogle);
  yield takeLatest(constants.EDIT_PROFILE_REQUESTED, editProfile);
}

export default mainSaga;
