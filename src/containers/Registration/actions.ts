import * as constants from './constants';
import { IUserData, IConfirmSignUpResponse } from './types';

export const signUpGoogleRequest = (code: string) => ({
  type: constants.SIGN_UP_GOOGLE_REQUESTED,
  code
});

interface signUpGoogleResponse {
  user: IUserData;
  registerToken: string;
}

export const signUpGoogleSuccessed = (response: signUpGoogleResponse) => ({
  type: constants.SIGN_UP_GOOGLE_SUCCESSED,
  user: response.user,
  registerToken: response.registerToken
});

export const signUpGoogleFailed = () => ({
  type: constants.SIGN_UP_GOOGLE_FAILED
});

export const confirmSignUpRequest = (user: IUserData) => ({
  type: constants.CONFIRM_SIGN_UP_REQUESTED,
  user
});

export const confirmSignUpSuccessed = (response: IConfirmSignUpResponse) => ({
  type: constants.CONFIRM_SIGN_UP_SUCCESSED,
  user: response.user,
  token: response.token
});
export const confirmSignUpFailed = () => ({
  type: constants.CONFIRM_SIGN_UP_FAILED
});
