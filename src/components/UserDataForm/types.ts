import { IUserData } from '../../shared/types';

export interface FormValues {
  avatar: string;
  role: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  telephone: string;
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
  experience: number;
  interests: number[];
}

export interface MyFormProps {
  templateUser: IUserData;
  onSubmit: (user: FormValues) => void;
}

export interface IInterest {
  id: number;
  name: string;
}
