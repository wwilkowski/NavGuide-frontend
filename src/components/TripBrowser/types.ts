import { ISingleTripType, IPosition, ISuggestedPlace } from '../../containers/TripBrowser/types';
import { SetStateAction, Dispatch } from 'react';

export interface ISearchFormValues {
  location: string;
  lat: number;
  lon: number;
  radius: number;
  searchMode: string;
  activeTags: string[];
  end: Date;
}

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (location: ISuggestedPlace, radius: number, mode: string, end: Date) => void;
  updateActiveTags: (tagNames: string[]) => void;
  setPosition: (position: IPosition) => void;
  formValue: string;
  positionValue: IPosition;
  trips: ISingleTripType[];
  onCityHover: (location: ISuggestedPlace) => void;
  onCityClick: () => void;
  tripInfoVisible: boolean;
  changeTripInfoVisible: (id: number) => void;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
  mode: string;
  chosenOfferId: number | null;
  setChosenOfferId: (offerId: number | null) => void;
  changeTripInfoVisible: (id: number) => void;
}

export interface IListSuggestedTripsProps {
  onCityClick: (location: ISuggestedPlace) => void;
  onCityHover: (location: ISuggestedPlace) => void;
  suggestedTrips: ISuggestedPlace[];
  activeTags: string[];
  changeVisible: () => void;
}
