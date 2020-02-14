import { ISingleTripType } from '../../containers/TripBrowser/types';

export interface ITripInfoProps {
  tripInformations: ISingleTripType;
  changeTripInfoVisible: (id: number) => void;
}
