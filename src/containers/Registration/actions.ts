import * as constants from './constants';
import { UserDataType, SignUpResponse } from './types';

export const signUpGoogleUserRequest = (code: string) => ({
  type: constants.SIGN_UP_GOOGLE_USER_REQUESTED,
  code
});

export const signUpGoogleUserSuccessed = (user: UserDataType) => ({
  type: constants.SIGN_UP_GOOGLE_USER_SUCCESSED,
  user
});

export const signUpGoogleUserFailed = () => ({
  type: constants.SIGN_UP_GOOGLE_USER_FAILED
});

export const signUpRequest = (user: UserDataType) => ({
  type: constants.SIGN_UP_REQUESTED,
  user
});

export const signUpSuccessed = (response: SignUpResponse) => ({
  type: constants.SIGN_UP_SUCCESSED,
  user: response.user,
  token: response.token
});
export const signUpFailed = () => ({
  type: constants.SIGN_UP_FAILED
});
