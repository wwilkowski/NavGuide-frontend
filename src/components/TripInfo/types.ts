import { ISingleTripType, IGuideProfile } from '../../containers/TripBrowser/types';
import { IUserProfile } from '../../containers/User/types';
import { IUserData } from '../../shared/types';

export interface ITripInfoProps {
  tripInformations: ISingleTripType;
  guideProfile: IGuideProfile;
  guideProfileData: IUserProfile;
}
