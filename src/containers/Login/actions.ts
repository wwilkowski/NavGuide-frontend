import * as constants from './constants';
import * as types from './types';

export const logInGoogleRequest = (code: string) => ({
  type: constants.LOG_IN_GOOGLE_REQUESTED,
  code
});

export const logInGoogleSuccessed = (user: types.IUserData) => ({
  type: constants.LOG_IN_GOOGLE_SUCCESSED,
  user
});

export const logInGoogleFailed = () => ({
  type: constants.LOG_IN_GOOGLE_FAILED
});

export const logOutGoogleRequest = (code: string) => ({
  type: constants.LOG_OUT_GOOGLE_REQUESTED,
  code
});

export const logOutGoogleSuccessed = () => ({
  type: constants.LOG_OUT_GOOGLE_SUCCESSED
});

export const logOutGoogleFailed = () => ({
  type: constants.LOG_OUT_GOOGLE_FAILED
});
