import { IUserData, IUserFormValues } from "../../shared/types";

// export interface IUserData {
//   avatar: string;
//   role: string;
//   firstName: string;
//   lastName: string;
//   country: string;
//   email: string;
//   telephone: string;
//   gender: string;
//   experience: string;
//   interests: number[];
// }
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

export interface ILogInGoogleRequest {
  type: string;
  code: string;
}
