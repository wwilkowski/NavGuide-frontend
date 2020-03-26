import { IUserData, IUserFormValues } from '../../shared/types';
import { ISingleTripType, IEndedSingleTripType } from '../TripBrowser/types';
import {
  GET_PROFILE_HISTORY_OFFERS_FAILED,
  GET_PROFILE_HISTORY_OFFERS_SUCCESSED,
  GET_PROFILE_HISTORY_OFFERS_REQUESTED,
  LOG_IN_GOOGLE_SUCCESSED,
  LOG_OUT_GOOGLE_SUCCESSED
} from './constants';

export interface IEditProfileAction {
  type: string;
  editUser: IUserData;
  user: IUserFormValues;
}
export interface ILogInSuccessedAction {
  type: typeof LOG_IN_GOOGLE_SUCCESSED;
  user: IUserData;
}

export interface ILogOutSuccessedAction {
  type: typeof LOG_OUT_GOOGLE_SUCCESSED;
}

export interface IProfileData {
  user: IUserData;
  isLoggedIn: boolean;
  historyOffers: IEndedSingleTripType[];
}

export interface ISendAvatarAction {
  type: string;
  file: File;
}

export interface ILogInGoogleRequest {
  type: string;
  code: string;
}

export interface IGetProfileHistoryOffersRequest {
  type: typeof GET_PROFILE_HISTORY_OFFERS_REQUESTED;
  userId: number;
}

export interface IGetProfileHistorySuccessedAction {
  type: typeof GET_PROFILE_HISTORY_OFFERS_SUCCESSED;
  trips: ISingleTripType[];
}

export interface IGetProfileHistoryFailedAction {
  type: typeof GET_PROFILE_HISTORY_OFFERS_FAILED;
  message: string;
}

interface IAny {
  type: string;
  user: IUserData;
}

export type IProfileActionType = ILogInSuccessedAction | IGetProfileHistorySuccessedAction | ILogOutSuccessedAction | IAny;
