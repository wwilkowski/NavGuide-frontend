import { ISingleTripType } from "../../containers/TripBrowser/types";

export interface ISearchFormProps {
  onSubmit: (location: string) => void;
  geoMode: boolean;
  geoModeChange: () => void;
}

export interface IListTripsProps {
  trips: ISingleTripType[];
}
