import { IMultiTripsType, ISingleTripType } from "../../containers/TripBrowser/types";

export interface ISearchFormProps {
  onSubmit: (location: string) => void;
}

export interface IListTripsProps {
  trips: ISingleTripType[]
}