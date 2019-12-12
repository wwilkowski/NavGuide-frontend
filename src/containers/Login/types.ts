import { LOG_IN_GOOGLE_SUCCESSED } from './constants';

export interface LogInSuccessedAction {
  type: typeof LOG_IN_GOOGLE_SUCCESSED;
  user: UserDataType;
}

export interface UserDataType {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
}

export interface LoginDataType {
  user: UserDataType;
  isLoggedIn: boolean;
}

export interface LogInGoogleRequest {
  type: string;
  code: string;
}
