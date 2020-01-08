import { ISingleTripType, IPosition } from '../../containers/TripBrowser/types';
import { SetStateAction } from 'react';

export interface ISearchFormValues {
  location: string;
  lat: number;
  lon: number;
  radius: number;
  searchMode: string;
  activeTags: string[];
}

export interface ISearchFormProps {
  onChange: (location: string, position: IPosition) => void;
  onSubmit: (location: string, position: IPosition, searchMode: string, activeTags: string[]) => void;
  updateActiveTags: (tagNames: string[]) => void;
  setPosition: (position: IPosition) => void;
  formValue: string;
  positionValue: IPosition;
  trips: ISingleTripType[];
}
export interface IListTripsProps {
  trips: ISingleTripType[];
  mode: string;
}

export interface IListSuggestedTripsProps {
  onCityClick: (location: string, position: IPosition, searchMode: string, activeTags: string[]) => void;
  onCityHover: (location: string) => void;
  suggestedTrips: string[];
  activeTags: string[];
}
