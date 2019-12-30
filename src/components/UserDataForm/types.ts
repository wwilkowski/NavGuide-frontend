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
  experience: string;
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
  experience: string;
  interests: number[];
  toBeGuide: boolean;
}

export interface MyFormProps {
  templateUser: IUserData;
  onSubmit: (user: FormValues, toBeGuide: boolean) => void;
}

export interface IInterest {
  id: number;
  name: string;
}
