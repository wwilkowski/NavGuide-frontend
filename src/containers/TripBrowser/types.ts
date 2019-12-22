import { useState, useEffect } from "react";
import {
  FILTER_TRIPS,
  FETCH_TRIPS_REQUESTED,
  FETCH_TRIPS_SUCCESED
} from "./constants";

export interface ITag {
  id: number;
  name: string;
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
