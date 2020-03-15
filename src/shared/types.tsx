export interface IUserData {
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
  age: number;
  experience: number;
  interests: number[];
}

export interface IEditProfileValues {
  country: string;
  email: string;
  experience: number;
  firstName: string;
  interests: number[];
  lastName: string;
  telephone: string;
}

// localisation - usePosition()

export interface IGeoLocationProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface IPositionData {
  latitude: number;
  longitude: number;
}
