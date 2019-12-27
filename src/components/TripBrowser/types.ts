import {
  ISingleTripType,
  ITag,
  IPosition
} from "../../containers/TripBrowser/types";

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (
    location: string,
    position: IPosition,
    searchMode: string,
    activeTags: string[]
  ) => void;
  formValue: string;
  positionValue: IPosition;
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
    position: IPosition,
    searchMode: string,
    activeTags: string[]
  ) => void;
  onCityHover: (location: string) => void;
  suggestedTrips: string[];
  activeTags: string[];
}
