import { ISingleTripType, IPosition, ISuggestedPlace } from '../../containers/TripBrowser/types';

export enum ListMode {
  normal,
  closest,
  popular,
}

export interface ISearchFormValues {
  location: string;
  lat: number;
  lon: number;
  radius: number;
  searchMode: string;
  interests: string[];
  begin: Date;
  end: Date;
}

export interface ISearchFormProps {
  onChange: (location: string) => void;
  onSubmit: (location: ISuggestedPlace, radius: number, mode: string) => void;
  setDate: (begin: Date, end: Date) => void;
  updateActiveTags: (tagNames: number[]) => void;
  setPosition: (position: IPosition) => void;
  formValue: string;
  positionValue: IPosition;
  trips: ISingleTripType[];
  onCityClick: () => void;
  isLogged: boolean;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
  closestTrips: ISingleTripType[];
  mode: ListMode;
  chosenOfferId: number | null;
  setChosenOfferId: (offerId: number | null) => void;
}

export interface IListSuggestedTripsProps {
  onCityClick: (location: ISuggestedPlace) => void;
  suggestedTrips: ISuggestedPlace[];
  activeTags: string[];
  changeVisible: () => void;
  dataLoading?: boolean;
}
