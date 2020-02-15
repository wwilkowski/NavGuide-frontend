import { ISingleTripType } from '../../../containers/TripBrowser/types';
import { IUserData } from '../../../shared/types';

export interface IInformationsProps {
  mode: string;
  changeInformationsMode: (mode: string) => void;
  tripData: ISingleTripType;
  //guideData: IUserData;
}
