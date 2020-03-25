import { ISingleTripType } from '../../../containers/TripBrowser/types';

export interface IReportPopupProps {
  trip: ISingleTripType;
  changeVisibility: () => void;
}
