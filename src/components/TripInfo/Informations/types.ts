import { ISingleTripType } from '../../../containers/TripBrowser/types';
import { IUserData } from '../../../shared/types';
import { IUserProfile } from '../../../containers/User/types';
import { IGuideProfile } from '../../../containers/GuideProfile/types';

export interface IInformationsProps {
  mode: string;
  changeInformationsMode: (mode: string) => void;
  tripData: ISingleTripType;
  guideProfile: IGuideProfile;
  guideProfileData: IUserProfile;
  //guideData: IUserData;
}
