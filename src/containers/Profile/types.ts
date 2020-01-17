import { IUserData, IUserFormValues } from '../../shared/types';

export interface IEditProfileAction {
  type: string;
  editUser: IUserData;
  user: IUserFormValues;
}
export interface ILogInSuccessedAction {
  type: string;
  user: IUserData;
}

export interface IProfileData {
  user: IUserData;
  isLoggedIn: boolean;
}

export interface ISendAvatarAction {
  type: string;
  file: File;
}

export interface ILogInGoogleRequest {
  type: string;
  code: string;
}
