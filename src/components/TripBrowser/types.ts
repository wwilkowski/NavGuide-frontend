import { ISingleTripType, ITag } from "../../containers/TripBrowser/types";
import { SetStateAction } from "react";

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (
    location: string,
    searchMode: string,
    activeTags: string[]
  ) => void;
  formValue: string;
  radiusValue: string;
  tagsData: ITag[];
  updateActiveTags: (tagNames: string[]) => void;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
  mode: string;
  onIncreaseRadius: (r: number) => void;
}

export interface IListSuggestedTripsProps {
  onCityClick: (
    location: string,
    searchMode: string,
    activeTags: string[]
  ) => void;
  onCityHover: (location: string) => void;
  suggestedTrips: string[];
  activeTags: string[];
}
