import * as constants from './constants';
import * as types from './types';

export const cleanUserProfiles = () => ({
  type: constants.CLEAN_USER_PROFILES
});

export const getUserProfileRequest = (id: number) => ({
  type: constants.FETCH_USER_PROFILE_REQUEST,
  id
});

export const getUserProfileSuccessed = (user: types.IUserProfile) => ({
  type: constants.FETCH_USER_PROFILE_SUCCESED,
  user
});

export const getUserProfileFailed = (message: string) => ({
  type: constants.FETCH_USER_PROFILE_FAILED,
  message
});
