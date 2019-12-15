export interface IUserData {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  tel: string;
  gender: string;
  experience: number;
}
export interface ILogInSuccessedAction {
  type: string;
  user: IUserData;
}

export interface ILoginData {
  user: IUserData;
  isLoggedIn: boolean;
}

export interface ILogInGoogleRequest {
  type: string;
  code: string;
}
