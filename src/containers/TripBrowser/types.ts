import { SignPrivateKeyInput } from "crypto";
import {
  FILTER_TRIPS,
  FETCH_TRIPS_REQUESTED,
  FETCH_TRIPS_SUCCESED
} from "./constants";

export interface ISingleTripType {
  id: number;
  location: string;
  radius: number;
  begin: string;
  end: string;
  maxPeople: number;
  price: number;
  priceType: string;
  inSearch: number;
}

export interface IMultiTripsType {
  trips: ISingleTripType[];
}

export interface IFetchTripsSuccesedAction {
  type: typeof FETCH_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFilterTripsAction {
  type: typeof FILTER_TRIPS;
  location: string;
}

export type TripBrowserAction =
  | IFetchTripsRequest
  | IFilterTripsAction
  | IFetchTripsSuccesedAction;

export interface IFetchTripsRequest {
  type: typeof FETCH_TRIPS_REQUESTED;
}
