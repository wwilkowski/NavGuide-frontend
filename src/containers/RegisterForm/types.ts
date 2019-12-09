import { SIGN_UP_USER_SUCCESSED } from './constants';

export interface UserInfoType {
  name: string;
  surname: string;
  logged: boolean;
}

export interface SignUpUserSuccessedAction {
  type: typeof SIGN_UP_USER_SUCCESSED;
  user: UserInfoType;
}
