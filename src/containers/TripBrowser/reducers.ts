import { TripBrowserAction, IMultiTripsAndTagsType } from './types';
import {
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_TAGS_SUCCESED,
  FETCH_CITY_TRIPS_SUCCESED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_SUGGESTED_CITIES_SUCCESED
} from './constants';

const initialState: IMultiTripsAndTagsType = {
  trips: [],
  tags: [],
  suggestedCities: []
};

const TripBrowserReducer = (state = initialState, action: TripBrowserAction) => {
  switch (action.type) {
    case FETCH_RANDOM_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };
    case FETCH_CITY_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };
    case FETCH_GEO_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };
    case FETCH_TAGS_SUCCESED:
      return { ...state, tags: action.tags };
    case FETCH_SUGGESTED_CITIES_SUCCESED:
      return { ...state, suggestedCities: action.suggestedCities };
    default:
      return state;
  }
};

export default TripBrowserReducer;
