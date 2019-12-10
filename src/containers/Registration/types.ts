import { SIGN_UP_USER_SUCCESSED } from './constants';

export interface UserDataType {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
  registrationInProgress: boolean;
}

export interface SignUpUserSuccessedAction {
  type: typeof SIGN_UP_USER_SUCCESSED;
  user: UserDataType;
}
