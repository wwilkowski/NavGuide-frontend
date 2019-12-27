import { useState, useEffect } from "react";
import {
  FETCH_TRIPS_REQUESTED,
  FETCH_TRIPS_SUCCESED,
  SET_ACTIVE_TAGS,
  FETCH_TAGS_SUCCESED,
  FETCH_TAGS_REQUESTED,
  FETCH_TRIPS_FAILED,
  FETCH_TAGS_FAILED
} from "./constants";

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
  id: number;
  location: string;
  begin: string;
  end: string;
  maxPeople: number;
  price: number;
  priceType: string;
  inSearch: number;
  lat: number;
  lon: number;
  radius: number;
  tags: ITag[];
}

export interface IMultiTripsType {
  trips: ISingleTripType[];
}

export interface IMultiTripsAndTagsType {
  trips: ISingleTripType[];
  tags: ITag[];
}

export interface IFetchTripsSuccesedAction {
  type: typeof FETCH_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFetchTripsFailedAction {
  type: typeof FETCH_TRIPS_FAILED;
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

export interface ISetActiveTagsAction {
  type: typeof SET_ACTIVE_TAGS;
  tags: string[];
}

export type TripBrowserAction =
  | IFetchTripsRequest
  | IFetchTripsSuccesedAction
  | IFetchTripsFailedAction
  | IFetchTagsSuccesedAction
  | IFetchTripsFailedAction
  | ISetActiveTagsAction;

export interface IFetchTripsRequest {
  type: typeof FETCH_TRIPS_REQUESTED;
}

export interface IFetchTagsRequest {
  type: typeof FETCH_TAGS_REQUESTED;
}

//hook, ktory pobiera lokalizaccje
interface IGeoLocationProps {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface IPositionData {
  latitude: number;
  longitude: number;
}

const initialPosition: IPositionData = {
  latitude: 0,
  longitude: 0
};

export const usePosition = () => {
  const [position, setPosition] = useState<IPositionData>(initialPosition);

  const onChange = ({ coords }: IGeoLocationProps) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      console.log("GeoLocation doesn't supported");
    }

    const watcher = geo.watchPosition(onChange);

    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position };
};
