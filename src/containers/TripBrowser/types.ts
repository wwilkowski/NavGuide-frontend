import { useState, useEffect } from 'react';
import {
  FETCH_TAGS_SUCCESED,
  FETCH_TAGS_REQUESTED,
  FETCH_TAGS_FAILED,
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_CITY_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_RANDOM_TRIPS_FAILED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_CITY_TRIPS_SUCCESED,
  FETCH_CITY_TRIPS_FAILED,
  FETCH_GEO_TRIPS_FAILED
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
  city: string;
  id: number;
  inSearch: number;
  lat: number;
  lon: number;
  name: string;
  price: number;
  priceType: string;
  tags: ITag[];
}

export interface IMultiTripsType {
  trips: ISingleTripType[];
}

export interface IMultiTripsAndTagsType {
  trips: ISingleTripType[];
  tags: ITag[];
}

export interface IFetchRandomTripsSuccesedAction {
  type: typeof FETCH_RANDOM_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFetchRandomTripsFailedAction {
  type: typeof FETCH_RANDOM_TRIPS_FAILED;
  message: string;
}

export interface IFetchCityTripsSuccesedAction {
  type: typeof FETCH_CITY_TRIPS_SUCCESED;
  trips: IMultiTripsType;
}

export interface IFetchCityTripsFailedAction {
  type: typeof FETCH_CITY_TRIPS_FAILED;
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

export type TripBrowserAction =
  | IFetchRandomTripsRequest
  | IFetchRandomTripsSuccesedAction
  | IFetchRandomTripsFailedAction
  | IFetchCityTripsSuccesedAction
  | IFetchCityTripsFailedAction
  | IFetchGeoTripsSuccesedAction
  | IFetchTagsSuccesedAction
  | IFetchTagsSuccesedAction
  | IFetchRandomTripsFailedAction;

export interface IFetchRandomTripsRequest {
  type: typeof FETCH_RANDOM_TRIPS_REQUESTED;
}

export interface IFetchCityTripsRequest {
  type: typeof FETCH_CITY_TRIPS_REQUESTED;
  city: string;
}

export interface IFetchGeoTripsRequest {
  type: typeof FETCH_GEO_TRIPS_REQUESTED;
  lat: number;
  lon: number;
  radius: number;
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
