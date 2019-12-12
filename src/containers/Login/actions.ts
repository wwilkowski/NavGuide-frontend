import * as constants from './constants';
import { UserDataType } from './types';

export const logInGoogleRequest = (code: string) => ({
  type: constants.LOG_IN_GOOGLE_REQUESTED,
  code
});

export const logInGoogleSuccessed = (user: UserDataType) => ({
  type: constants.LOG_IN_GOOGLE_SUCCESSED,
  user
});

export const logInGoogleFailed = () => ({
  type: constants.LOG_IN_GOOGLE_FAILED
});
