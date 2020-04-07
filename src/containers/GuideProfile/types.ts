import { IUserProfile } from '../User/types';
import { ISingleTripType, IEndedSingleTripType } from '../TripBrowser/types';
import {
  FETCH_GUIDE_PROFILE_REQUESTED,
  FETCH_GUIDE_PROFILE_SUCCESSED,
  FETCH_GUIDE_PROFILE_FAILED,
  FETCH_GUIDE_PROFILE_DATA_REQUESTED,
  FETCH_GUIDE_PROFILE_DATA_FAILED,
  FETCH_GUIDE_PROFILE_DATA_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED,
  FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_FAILED,
  FETCH_GUIDE_HISTORY_REQUESTED,
  FETCH_GUIDE_HISTORY_FAILED,
  FETCH_GUIDE_HISTORY_SUCCESSED,
} from './constants';

export interface IGuideProfileDataProps {
  profileData: IUserProfile;
  profile: IGuideProfile;
}

export interface IGuideProfileActiveOffersProps {
  activeOffers: ISingleTripType[];
}

export interface IGuideProfileHistoryOffersProps {
  historyOffers: IEndedSingleTripType[];
}

export interface IGuideProfile {
  avatar: string;
  averageMark: number;
  languages: string[];
  lastName: string;
  firstName: string;
  guideId: number;
  userId: number;
  experience: number;
}

export interface IGuideProfileComplete {
  guideProfile: IGuideProfile;
  guideProfileData: IUserProfile;
  activeOffers: ISingleTripType[];
  historyOffers: IEndedSingleTripType[];
}

export interface IFetchGuideProfileSuccessed {
  type: typeof FETCH_GUIDE_PROFILE_SUCCESSED;
  guideProfile: IGuideProfile;
}

export interface IFetchGuideProfileFailed {
  type: typeof FETCH_GUIDE_PROFILE_FAILED;
  message: string;
}

export interface IFetchGuideProfileDataSuccessed {
  type: typeof FETCH_GUIDE_PROFILE_DATA_SUCCESSED;
  guideProfileData: IUserProfile;
}

export interface IFetchGuideProfileDataFailed {
  type: typeof FETCH_GUIDE_PROFILE_DATA_FAILED;
  message: string;
}

export interface IFetchGuideActiveOffersSuccessed {
  type: typeof FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED;
  activeOffers: ISingleTripType[];
}

export interface IFetchGuideActiveOffersFailed {
  type: typeof FETCH_GUIDE_ACTIVE_OFFERS_FAILED;
  message: string;
}

export interface IFetchGuideHistorySuccessed {
  type: typeof FETCH_GUIDE_HISTORY_SUCCESSED;
  historyOffers: IEndedSingleTripType[];
}

export interface IFetchGuideHistoryFailed {
  type: typeof FETCH_GUIDE_HISTORY_FAILED;
  message: string;
}

export type GuideProfileAction =
  | IFetchGuideProfileSuccessed
  | IFetchGuideProfileFailed
  | IFetchGuideProfileDataSuccessed
  | IFetchGuideProfileDataFailed
  | IFetchGuideActiveOffersSuccessed
  | IFetchGuideActiveOffersFailed
  | IFetchGuideHistorySuccessed
  | IFetchGuideHistoryFailed;

export interface IFetchGuideProfileRequest {
  type: typeof FETCH_GUIDE_PROFILE_REQUESTED;
  id: number;
}

export interface IFetchGuideProfileDataRequest {
  type: typeof FETCH_GUIDE_PROFILE_DATA_REQUESTED;
  id: number;
}

export interface IFetchGuideActiveOffersRequest {
  type: typeof FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED;
  id: number;
}

export interface IFetchGuideHistoryRequest {
  type: typeof FETCH_GUIDE_HISTORY_REQUESTED;
  id: number;
}
