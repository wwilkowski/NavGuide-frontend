// Store
import {
  SIGN_UP_GOOGLE_SUCCESSED,
  CONFIRM_SIGN_UP_SUCCESSED,
  GET_INTERESTS_SUCCESSED,
  SEND_REGISTER_GUIDE_REQUEST,
  GET_GUIDE_INFO_SUCCESSED
} from './constants';
import { IUserData } from '../../shared/types';
import { FormValues } from '../../components/GuideRegisterForm/types';

export interface IRegisterStore {
  templateUser: IUserData;
  registrationInProgress: boolean;
  registrationToken: string;
  interests: IInterest[];
  toBeGuide: boolean;
  guideRequests: IGuideRequest[];
}

// Google

export interface ISignUpGoogleSuccessedAction {
  type: typeof SIGN_UP_GOOGLE_SUCCESSED;
  templateUser: IUserData;
  registerToken: string;
}

export interface ISignUpGoogleRequest {
  type: string;
  code: string;
}

// Confirm

export interface IConfirmSignUpSuccessedAction {
  type: typeof CONFIRM_SIGN_UP_SUCCESSED;
  user: IUserData;
  token: string;
}

export interface IConfirmSignUpRequest {
  type: string;
  templateUser: IUserData;
  token: string;
  toBeGuide: boolean;
}

export interface IConfirmSignUpResponse {
  user: IUserData;
  token: string;
}

// interests

export interface IInterest {
  id: number;
  name: string;
}

export interface IGetInterestsResponse {
  interests: IInterest[];
}

export interface IGetInterestsSuccessedAction {
  interests: IInterest[];
}

export interface IGetInterestsSuccessed {
  type: typeof GET_INTERESTS_SUCCESSED;
  interests: IInterest[];
}

// register guide

export interface ISendRegisterGuideRequest {
  type: typeof SEND_REGISTER_GUIDE_REQUEST;
  guideValues: FormValues;
}

export interface IGetGuideInfoSuccessed {
  type: typeof GET_GUIDE_INFO_SUCCESSED;
  requests: IGuideRequest[];
}

// action types

export type ISignUpActionType = ISignUpGoogleSuccessedAction | IGetInterestsSuccessed | IGetGuideInfoSuccessed;

export interface IGuideRequest {
  date: string;
  description: string;
  languages: string[];
  message: string;
  status: string;
}
