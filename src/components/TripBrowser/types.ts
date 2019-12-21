import { ISingleTripType } from "../../containers/TripBrowser/types";
import { SetStateAction } from "react";

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (location: string, searchMode: string) => void;
  value: string;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
  mode: string;
}

export interface IListSuggestedTripsProps {
  onCityClick: (location: string, searchMode: string) => void;
  onCityHover: (location: string) => void;
  suggestedTrips: string[];
}
