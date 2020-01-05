import * as constants from './constants';
import { IUserData, IUserFormValues } from '../../shared/types';

export const logInGoogleRequest = (code: string) => ({
  type: constants.LOG_IN_GOOGLE_REQUESTED,
  code
});

export const logInGoogleSuccessed = (user: IUserData) => ({
  type: constants.LOG_IN_GOOGLE_SUCCESSED,
  user
});

export const logInGoogleFailed = () => ({
  type: constants.LOG_IN_GOOGLE_FAILED
});

export const logOutGoogleRequest = () => ({
  type: constants.LOG_OUT_GOOGLE_REQUESTED
});

export const logOutGoogleSuccessed = () => ({
  type: constants.LOG_OUT_GOOGLE_SUCCESSED
});

export const logOutGoogleFailed = () => ({
  type: constants.LOG_OUT_GOOGLE_FAILED
});

export const editProfileRequest = (editUser: IUserFormValues, user: IUserData) => ({
  type: constants.EDIT_PROFILE_REQUESTED,
  editUser,
  user
});

export const editProfileSuccessed = (user: IUserData) => ({
  type: constants.EDIT_PROFILE_SUCCESSED,
  user
});

export const editProfileFailed = () => ({
  type: constants.EDIT_PROFILE_FAILED
});
