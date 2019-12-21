// Store
import { SIGN_UP_GOOGLE_SUCCESSED, CONFIRM_SIGN_UP_SUCCESSED, GET_INTERESTS_SUCCESSED } from './constants';

export interface IUserData {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  gender: string;
  experience: string;
}

export interface IRegisterStore {
  user: IUserData;
  registrationInProgress: boolean;
  registrationToken: string;
  interests: IInterest[];
}

// Google

export interface ISignUpGoogleSuccessedAction {
  type: typeof SIGN_UP_GOOGLE_SUCCESSED;
  user: IUserData;
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
  user: IUserData;
  token: string;
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

// action types

export type ISignUpActionType = ISignUpGoogleSuccessedAction | IGetInterestsSuccessed;
