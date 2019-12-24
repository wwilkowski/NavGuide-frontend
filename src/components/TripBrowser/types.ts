import { ISingleTripType, ITag } from "../../containers/TripBrowser/types";
import { SetStateAction } from "react";

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (location: string, searchMode: string) => void;
  formValue: string;
  radiusValue: string;
  onTagChange: (tags: string[]) => void;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
  mode: string;
  onIncreaseRadius: (r: number) => void;
}

export interface IListSuggestedTripsProps {
  onCityClick: (location: string, searchMode: string) => void;
  onCityHover: (location: string) => void;
  suggestedTrips: string[];
}
