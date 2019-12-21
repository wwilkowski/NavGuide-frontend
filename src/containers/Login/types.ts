export interface IUserData {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  gender: string;
  experience: string;
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
