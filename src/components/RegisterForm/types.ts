import { IUserData } from '../../containers/Registration/types';

export interface FormValues {
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
