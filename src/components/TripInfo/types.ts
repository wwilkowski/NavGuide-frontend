import { ISingleTripType } from '../../containers/TripBrowser/types';
import { IUserProfile } from '../../containers/User/types';
import { IGuideProfile } from '../../containers/GuideProfile/types';

export interface ITripInfoProps {
  tripInformations: ISingleTripType;
  guideProfile: IGuideProfile;
  guideProfileData: IUserProfile;
}
