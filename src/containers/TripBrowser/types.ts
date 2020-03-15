import {
  FETCH_TAGS_SUCCESED,
  FETCH_TAGS_REQUESTED,
  FETCH_TAGS_FAILED,
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_NAME_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_RANDOM_TRIPS_FAILED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_NAME_TRIPS_SUCCESED,
  FETCH_NAME_TRIPS_FAILED,
  FETCH_GEO_TRIPS_FAILED,
  FETCH_SUGGESTED_CITIES_REQUESTED,
  FETCH_SUGGESTED_CITIES_SUCCESED,
  FETCH_SUGGESTED_CITIES_FAILED
} from './constants';

export interface ITag {
  id: number;
  name: string;
}

export interface IPosition {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface ISingleTripType {
  averageMark: number;
  begin: string;
  city: string;
  description: string;
  end: string;
  id: number;
  lat: number;
  lon: number;
  maxPeople: number;
  name: string;
  owner: {
    experience: number;
    firstName: string;
    guideId: number;
    languages: string[];
    lastName: string;
    userId: number;
  };
  photos: string[];
  price: number;
  priceType: string;
  radius: number;
  sold: number;
  tags: ITag[];
}

export interface IEndedSingleTripType {
  date: string;
  offer: ISingleTripType;
}

export interface IMultiTripsType {
  trips: ISingleTripType[];
}

export interface IMultiEndedTripsType {
  trips: IEndedSingleTripType[];
}

export interface IMultiTripsAndTagsType {
  trips: ISingleTripType[];
  tags: ITag[];
  places: ISuggestedPlace[];
}

export interface IFetchRandomTripsSuccesedAction {
  type: typeof FETCH_RANDOM_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFetchRandomTripsFailedAction {
  type: typeof FETCH_RANDOM_TRIPS_FAILED;
  message: string;
}

export interface IFetchNameTripsSuccesedAction {
  type: typeof FETCH_NAME_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFetchNameTripsFailedAction {
  type: typeof FETCH_NAME_TRIPS_FAILED;
  message: string;
}

export interface IFetchGeoTripsSuccesedAction {
  type: typeof FETCH_GEO_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFetchGeoTripsFailedAction {
  type: typeof FETCH_GEO_TRIPS_FAILED;
  message: string;
}

export interface IFetchTagsSuccesedAction {
  type: typeof FETCH_TAGS_SUCCESED;
  tags: ITag[];
}

export interface IFetchTagsFailedAction {
  type: typeof FETCH_TAGS_FAILED;
  message: string;
}

export interface ISuggestedPlace {
  displayName: string;
  coords: number[];
  class: string;
  type: string;
  address: {
    type: string;
    cityDistrict: string;
    country: string;
    countryCode: string;
    footway: string;
    neighbourhood: string;
    postcode: string;
    state: string;
    suburb: string;
  };
}

export interface IFetchSuggestedCitiesSuccesedAction {
  type: typeof FETCH_SUGGESTED_CITIES_SUCCESED;
  suggestedPlaces: ISuggestedPlace[];
}

export interface IFetchSuggestedCitiesFailedAction {
  type: typeof FETCH_SUGGESTED_CITIES_FAILED;
  message: string;
}

export type TripBrowserAction =
  | IFetchRandomTripsRequest
  | IFetchRandomTripsSuccesedAction
  | IFetchRandomTripsFailedAction
  | IFetchNameTripsSuccesedAction
  | IFetchNameTripsFailedAction
  | IFetchGeoTripsSuccesedAction
  | IFetchTagsSuccesedAction
  | IFetchTagsSuccesedAction
  | IFetchRandomTripsFailedAction
  | IFetchSuggestedCitiesSuccesedAction
  | IFetchSuggestedCitiesFailedAction;

export interface IFetchRandomTripsRequest {
  type: typeof FETCH_RANDOM_TRIPS_REQUESTED;
  isLogged: boolean;
}

export interface IFetchNameTripsRequest {
  type: typeof FETCH_NAME_TRIPS_REQUESTED;
  name: string;
}

export interface IFetchGeoTripsRequest {
  type: typeof FETCH_GEO_TRIPS_REQUESTED;
  lat: number;
  lon: number;
  radius: number;
  isLogged: boolean;
}

export interface IFetchTagsRequest {
  type: typeof FETCH_TAGS_REQUESTED;
}

export interface IFetchSuggestedCitiesRequest {
  type: typeof FETCH_SUGGESTED_CITIES_REQUESTED;
  location: string;
  number: number;
}
