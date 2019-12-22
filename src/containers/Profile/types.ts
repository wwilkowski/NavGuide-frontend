import { IInterest } from '../Registration/types';

export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  experience: string;
  telephone: string;
  avatar: string;
  interests: IInterest[];
  role: string;
}
export interface ILogInSuccessedAction {
  type: string;
  user: IUserData;
}

export interface IProfileData {
  user: IUserData;
  isLoggedIn: boolean;
}

export interface ILogInGoogleRequest {
  type: string;
  code: string;
}
