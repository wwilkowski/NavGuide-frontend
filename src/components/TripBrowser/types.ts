import { ISingleTripType } from "../../containers/TripBrowser/types";

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (location: string) => void;
  trips: ISingleTripType[];
}

export interface IListTripsProps {
  trips: ISingleTripType[];
}

export interface IListSuggestedTripsProps {
  trips: ISingleTripType[];
}