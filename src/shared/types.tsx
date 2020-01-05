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

export interface IEditProfileValues {
  country: string;
  email: string;
  experience: string;
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
