import { IUserData } from '../../shared/types';

export interface FormValues {
  avatar: string;
  role: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  age: number;
  gender: string;
  experience: number;
  interests: number[];
}

export interface FullFormValues {
  avatar: string;
  role: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
  gender: string;
  age: number;
  experience: number;
  interests: number[];
}

export interface MyFormProps {
  templateUser: IUserData;
  register: boolean;
  onSubmit: (user: FormValues) => void;
}

export interface IInterest {
  id: number;
  name: string;
}
