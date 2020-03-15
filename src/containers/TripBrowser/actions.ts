import {
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_RANDOM_TRIPS_FAILED,
  FETCH_NAME_TRIPS_REQUESTED,
  FETCH_NAME_TRIPS_SUCCESED,
  FETCH_NAME_TRIPS_FAILED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_GEO_TRIPS_FAILED,
  FETCH_TAGS_REQUESTED,
  FETCH_TAGS_SUCCESED,
  FETCH_TAGS_FAILED,
  FETCH_SUGGESTED_CITIES_REQUESTED,
  FETCH_SUGGESTED_CITIES_SUCCESED,
  FETCH_SUGGESTED_CITIES_FAILED
} from './constants';
import { IMultiTripsType, ITag, ISuggestedPlace } from './types';

//RANDOM TRIPS
export const fetchRandomTripsRequested = (isLogged: boolean) => ({
  type: FETCH_RANDOM_TRIPS_REQUESTED,
  isLogged
});

export const fetchRandomTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_RANDOM_TRIPS_SUCCESED,
  trips
});

export const fetchRandomTripsFailed = (message: string) => ({
  type: FETCH_RANDOM_TRIPS_FAILED,
  message
});

//NAME TRIPS
export const fetchNameTripsRequested = (name: string) => ({
  type: FETCH_NAME_TRIPS_REQUESTED,
  name
});

export const fetchNameTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_NAME_TRIPS_SUCCESED,
  trips
});

export const fetchNameTripsFailed = (message: string) => ({
  type: FETCH_NAME_TRIPS_FAILED,
  message
});

//GEO TRIPS
export const fetchGeoTripsRequested = (lat: number, lon: number, radius: number, isLogged: boolean) => ({
  type: FETCH_GEO_TRIPS_REQUESTED,
  lat,
  lon,
  radius,
  isLogged
});

export const fetchGeoTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_GEO_TRIPS_SUCCESED,
  trips
});

export const fetchGeoTripsFailed = (message: string) => ({
  type: FETCH_GEO_TRIPS_FAILED,
  message
});

//TAGS
export const fetchTagsRequested = () => ({
  type: FETCH_TAGS_REQUESTED
});

export const fetchTagsSuccesed = (tags: ITag[]) => ({
  type: FETCH_TAGS_SUCCESED,
  tags
});

export const fetchTagsFailed = (message: string) => ({
  type: FETCH_TAGS_FAILED,
  message
});

//SUGGESTED CITIES
export const fetchSuggestedCitiesRequested = (location: string, number: number) => ({
  type: FETCH_SUGGESTED_CITIES_REQUESTED,
  location,
  number
});

export const fetchSuggestedCitiesSuccesed = (places: ISuggestedPlace) => ({
  type: FETCH_SUGGESTED_CITIES_SUCCESED,
  suggestedPlaces: places
});

export const fetchSuggestedCitiesFailed = (message: string) => ({
  type: FETCH_SUGGESTED_CITIES_FAILED,
  message
});
