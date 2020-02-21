import * as constants from './constants';

export interface IUserProfile {
  age: number;
  avatar: string;
  country: string;
  email: string;
  experience: number;
  firstName: string;
  gender: string;
  id: number;
  interests: [
    {
      id: number;
      name: string;
    }
  ];
  lastName: string;
  role: string;
  telephone: string;
}

export interface IUserProfiles {
  users: IUserProfile[];
}

export interface ICleanUserProfilesAction {
  type: typeof constants.CLEAN_USER_PROFILES;
}

export interface IGetUserProfileRequest {
  type: typeof constants.FETCH_USER_PROFILE_REQUEST;
  id: number;
}

export interface IGetUserProfileSuccessed {
  type: typeof constants.FETCH_USER_PROFILE_SUCCESED;
  user: IUserProfile;
}

export interface IGetUserProfileFailed {
  type: typeof constants.FETCH_USER_PROFILE_FAILED;
  message: string;
}

export type ProfileAction = ICleanUserProfilesAction | IGetUserProfileRequest | IGetUserProfileSuccessed | IGetUserProfileFailed;
