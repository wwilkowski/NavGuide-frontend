import {
  FETCH_GUIDE_PROFILE_REQUESTED,
  FETCH_GUIDE_PROFILE_FAILED,
  FETCH_GUIDE_PROFILE_DATA_REQUESTED,
  FETCH_GUIDE_PROFILE_DATA_SUCCESSED,
  FETCH_GUIDE_PROFILE_DATA_FAILED,
  FETCH_GUIDE_PROFILE_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED,
  FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_FAILED,
  FETCH_GUIDE_HISTORY_REQUESTED,
  FETCH_GUIDE_HISTORY_SUCCESSED,
  FETCH_GUIDE_HISTORY_FAILED
} from './constants';
import { IUserProfile } from '../User/types';
import { ISingleTripType, IEndedSingleTripType } from '../TripBrowser/types';
import { IGuideProfile } from './types';
//GUIDE PROFILE
export const fetchGuideProfileRequested = (id: number) => ({
  type: FETCH_GUIDE_PROFILE_REQUESTED,
  id
});

export const fetchGuideProfileSuccessed = (guideProfile: IGuideProfile) => ({
  type: FETCH_GUIDE_PROFILE_SUCCESSED,
  guideProfile
});

export const fetchGuideProfileFailed = (message: string) => ({
  type: FETCH_GUIDE_PROFILE_FAILED,
  message
});

//GUIDE PROFILE DATA
export const fetchGuideProfileDataRequest = (id: number) => ({
  type: FETCH_GUIDE_PROFILE_DATA_REQUESTED,
  id
});

export const fetchGuideProfileDataSuccessed = (guideProfileData: IUserProfile) => ({
  type: FETCH_GUIDE_PROFILE_DATA_SUCCESSED,
  guideProfileData
});

export const fetchGuideProfileDataFailed = (message: string) => ({
  type: FETCH_GUIDE_PROFILE_DATA_FAILED,
  message
});

//GUIDE ACTIVE OFFERS
export const fetchGuideActiveOffersRequest = (id: number) => ({
  type: FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED,
  id
});

export const fetchGuideActiveOffersSuccessed = (activeOffers: ISingleTripType[]) => ({
  type: FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED,
  activeOffers
});

export const fetchGuideActiveOffersFailed = (message: string) => ({
  type: FETCH_GUIDE_ACTIVE_OFFERS_FAILED,
  message
});

//GUIDE HISTORY OFFERS
export const fetchGuideHistoryRequest = (id: number) => ({
  type: FETCH_GUIDE_HISTORY_REQUESTED,
  id
});

export const fetchGuideHistorySuccessed = (historyOffers: IEndedSingleTripType[]) => ({
  type: FETCH_GUIDE_HISTORY_SUCCESSED,
  historyOffers
});

export const fetchGuideHistoryFailed = (message: string) => ({
  type: FETCH_GUIDE_HISTORY_FAILED,
  message
});
