import {
  FETCH_TRIPS_REQUESTED,
  FILTER_TRIPS,
  FETCH_TRIPS_SUCCESED,
  FETCH_TRIPS_FAILED,
  SET_ACTIVE_TAGS
} from "./constants";
import {
  IMultiTripsType,
  IMultiTripsAndTagsType,
  ISingleTripType
} from "./types";

export const fetchTripsFromStore = () => ({
  type: FETCH_TRIPS_REQUESTED
});

export const fetchTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_TRIPS_SUCCESED,
  trips
});

export const fetchTripsFailed = (message: string) => ({
  type: FETCH_TRIPS_FAILED,
  message
});

export const filterTrips = (location: string) => ({
  type: FILTER_TRIPS,
  location
});

export const setActiveTags = (tags: string[]) => ({
  type: SET_ACTIVE_TAGS,
  tags
});
