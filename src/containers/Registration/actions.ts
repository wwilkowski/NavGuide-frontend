import { SIGN_UP_GOOGLE_USER_REQUESTED, SIGN_UP_GOOGLE_USER_FAILED, SIGN_UP_GOOGLE_USER_SUCCESSED } from './constants';
import { UserDataType } from './types';

export const signUpUserRequest = (code: string) => ({
  type: SIGN_UP_GOOGLE_USER_REQUESTED,
  code
});

export const signUpUserSuccessed = (user: UserDataType) => ({
  type: SIGN_UP_GOOGLE_USER_SUCCESSED,
  user
});

export const signUpUserFailed = () => ({
  type: SIGN_UP_GOOGLE_USER_FAILED
});
