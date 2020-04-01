import * as constants from './constants';
import { IUserData, IUserFormValues } from '../../shared/types';
import { ISingleTripType } from '../TripBrowser/types';
import { IFeedback } from '../Offers/types';

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

export const getProfileRequest = () => ({
  type: constants.GET_PROFILE_REQUESTED
});

export const getProfileSuccessed = (user: IUserData) => ({
  type: constants.GET_PROFILE_SUCCESSED,
  user
});

export const getProfileFailed = () => ({
  type: constants.GET_PROFILE_FAILED
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

export const sendAvatarRequest = (file: File) => ({
  type: constants.SEND_AVATAR_REQUESTED,
  file
});

export const sendAvatarSuccessed = () => ({
  type: constants.SEND_AVATAR_SUCCESSED
});

export const sendAvatarFailed = () => ({
  type: constants.SEND_AVATAR_FAILED
});

export const getProfileHistoryRequest = (userId: number) => ({
  type: constants.GET_PROFILE_HISTORY_OFFERS_REQUESTED,
  userId
});

export const getProfileHistorySuccessed = (trips: ISingleTripType[]) => ({
  type: constants.GET_PROFILE_HISTORY_OFFERS_SUCCESSED,
  trips
});

export const getProfileHistoryFailed = (message: string) => ({
  type: constants.GET_PROFILE_HISTORY_OFFERS_FAILED,
  message
});

export const getOwnFeedbacksRequest = () => ({
  type: constants.GET_OWN_FEEDBACKS_REQUESTED
});

export const getOwnFeedbacksSuccessed = (feedbacks: IFeedback[]) => ({
  type: constants.GET_OWN_FEEDBACKS_SUCCESSED,
  feedbacks
});

export const getOwnFeedbacksFailed = (message: string) => ({
  message
});
