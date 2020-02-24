import { ISingleTripType, IGuideProfile } from '../../containers/TripBrowser/types';
import { IUserProfile } from '../../containers/User/types';

export interface ITripInfoProps {
  tripInformations: ISingleTripType;
  guideProfile: IGuideProfile;
  guideProfileData: IUserProfile;
  changeTripInfoVisible: (id: number) => void;
}
