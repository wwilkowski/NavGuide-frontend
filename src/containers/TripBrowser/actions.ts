import {
  FETCH_TRIPS_REQUESTED,
  FILTER_TRIPS,
  FETCH_TRIPS_SUCCESED,
  FETCH_TRIPS_FAILED
} from "./constants";
import { IMultiTripsType } from "./types";

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
