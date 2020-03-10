import { IUserProfile } from '../User/types';
import { ISingleTripType, IMultiTripsAndTagsType, IGuideProfile } from '../TripBrowser/types';

export interface IGuideProfileDataProps {
  profileData: IUserProfile;
  profile: IGuideProfile;
}

export interface IGuideProfileActiveOffersProps {}
