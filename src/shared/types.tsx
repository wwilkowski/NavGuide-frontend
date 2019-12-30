export interface IUserData {
  avatar: string;
  role: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  gender: string;
  experience: string;
  interests: IInterest[];
}

export interface IInterest {
  id: number;
  name: string;
}

export interface IUserFormValues {
  avatar: string;
  role: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  gender: string;
  experience: string;
  interests: number[];
}
