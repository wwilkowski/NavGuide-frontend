import { IUserProfile } from '../User/types';
import { ISingleTripType, IMultiTripsAndTagsType, IGuideProfile, IEndedSingleTripType } from '../TripBrowser/types';

export interface IGuideProfileDataProps {
  profileData: IUserProfile;
  profile: IGuideProfile;
  goBack: () => void;
}

export interface IGuideProfileActiveOffersProps {
  activeOffers: ISingleTripType[];
  goBack: () => void;
}

export interface IGuideProfileHistoryOffersProps {
  historyOffers: IEndedSingleTripType[];
  goBack: () => void;
}
