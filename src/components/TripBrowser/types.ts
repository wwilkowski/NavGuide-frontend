import { ISingleTripType } from "../../containers/TripBrowser/types";
import { SetStateAction } from "react";

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (location: string) => void;
  value: string;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
  mode: string;
}

export interface IListSuggestedTripsProps {
  onCityClick: (location: string) => void;
  onCityHover: (location: string) => void;
  suggestedTrips: string[];
}
