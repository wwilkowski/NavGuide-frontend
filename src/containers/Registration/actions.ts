import * as constants from './constants';
import * as types from './types';

export const signUpGoogleRequest = (code: string) => ({
  type: constants.SIGN_UP_GOOGLE_REQUESTED,
  code
});

interface signUpGoogleResponse {
  user: types.IUserData;
  registerToken: string;
}

export const signUpGoogleSuccessed = (response: signUpGoogleResponse): types.ISignUpActionType => ({
  type: constants.SIGN_UP_GOOGLE_SUCCESSED,
  user: response.user,
  registerToken: response.registerToken
});

export const signUpGoogleFailed = () => ({
  type: constants.SIGN_UP_GOOGLE_FAILED
});

export const confirmSignUpRequest = (user: types.IUserData, token: string) => ({
  type: constants.CONFIRM_SIGN_UP_REQUESTED,
  user,
  token
});

export const confirmSignUpSuccessed = (response: types.IConfirmSignUpResponse) => ({
  type: constants.CONFIRM_SIGN_UP_SUCCESSED,
  token: response.token
});

export const confirmSignUpFailed = () => ({
  type: constants.CONFIRM_SIGN_UP_FAILED
});

export const getInterestsRequest = () => ({
  type: constants.GET_INTERESTS_REQUESTED
});

export const getInterestsSuccessed = (response: types.IGetInterestsResponse) => ({
  type: constants.GET_INTERESTS_SUCCESSED,
  interests: response
});

export const getInterestsFailed = () => ({
  type: constants.GET_INTERESTS_FAILED
});
