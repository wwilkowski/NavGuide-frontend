import * as constants from './constants';
import { UserDataType, SignUpResponse } from './types';

export const signUpGoogleUserRequest = (code: string) => ({
  type: constants.SIGN_UP_GOOGLE_USER_REQUESTED,
  code
});

interface signUpGoogleResponse {
  user: UserDataType;
  registerToken: string;
}

export const signUpGoogleUserSuccessed = (response: signUpGoogleResponse) => ({
  type: constants.SIGN_UP_GOOGLE_USER_SUCCESSED,
  user: response.user,
  registerToken: response.registerToken
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
