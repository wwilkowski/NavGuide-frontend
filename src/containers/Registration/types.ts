// Store

export interface IUserData {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
}

export interface IRegisterStore {
  user: IUserData;
  registrationInProgress: boolean;
  registrationToken: string;
}

// Google

export interface ISignUpGoogleSuccessedAction {
  type: string;
  user: IUserData;
  registerToken: string;
}

export interface ISignUpGoogleRequest {
  type: string;
  code: string;
}

// Confirm

export interface IConfirmSignUpSuccessedAction {
  type: string;
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

// action types

export type ISignUpActionType = ISignUpGoogleSuccessedAction | IConfirmSignUpSuccessedAction;
