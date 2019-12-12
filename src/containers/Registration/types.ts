import { SIGN_UP_GOOGLE_USER_REQUESTED, SIGN_UP_GOOGLE_USER_SUCCESSED, SIGN_UP_REQUESTED, SIGN_UP_SUCCESSED } from './constants';

export interface UserDataType {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
}

export interface RegistrationDataType {
  user: UserDataType;
  registrationInProgress: boolean;
  registrationToken: string;
}

export interface SignUpUserSuccessedAction {
  type: typeof SIGN_UP_GOOGLE_USER_SUCCESSED;
  user: UserDataType;
  registerToken: string;
}

export interface SignUpSuccessedAction {
  type: typeof SIGN_UP_SUCCESSED;
  user: UserDataType;
  token: string;
}

export type SignUpActionType = SignUpUserSuccessedAction | SignUpSuccessedAction;

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUESTED;
  user: UserDataType;
}

export interface SignUpGoogleRequest {
  type: typeof SIGN_UP_GOOGLE_USER_REQUESTED;
  code: string;
}

export interface SignUpResponse {
  user: UserDataType;
  token: string;
}
