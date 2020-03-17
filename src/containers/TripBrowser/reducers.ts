import { TripBrowserAction, IMultiTripsAndTagsType } from './types';
import {
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_TAGS_SUCCESED,
  FETCH_NAME_TRIPS_SUCCESED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_SUGGESTED_CITIES_SUCCESED,
  FETCH_CLOSEST_TRIPS_SUCCESSED,
  FETCH_POPULAR_TRIPS_SUCCESSED
} from './constants';

const initialState: IMultiTripsAndTagsType = {
  trips: [],
  tags: [],
  places: []
};

const TripBrowserReducer = (state = initialState, action: TripBrowserAction) => {
  switch (action.type) {
    case FETCH_RANDOM_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };

    case FETCH_NAME_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };

    case FETCH_CLOSEST_TRIPS_SUCCESSED:
      return { ...state, trips: action.trips.trips };

    case FETCH_POPULAR_TRIPS_SUCCESSED:
      return { ...state, trips: action.trips.trips };

    case FETCH_GEO_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };

    case FETCH_TAGS_SUCCESED:
      return { ...state, tags: action.tags };

    case FETCH_SUGGESTED_CITIES_SUCCESED:
      return { ...state, places: action.suggestedPlaces };

    default:
      return state;
  }
};

export default TripBrowserReducer;
