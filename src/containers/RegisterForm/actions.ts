import { SIGN_UP_USER_REQUESTED, SIGN_UP_USER_FAILED, SIGN_UP_USER_SUCCESSED } from './constants';
import { UserInfoType } from './types';

export const signUpUserRequest = (code: string) => ({
  type: SIGN_UP_USER_REQUESTED,
  code
});

export const signUpUserSuccessed = (user: UserInfoType) => ({
  type: SIGN_UP_USER_SUCCESSED,
  user
});

export const signUpUserFailed = () => ({
  type: SIGN_UP_USER_FAILED
});
