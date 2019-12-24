import { TripBrowserAction, IMultiTripsAndTagsType } from "./types";
import {
  FILTER_TRIPS,
  FETCH_TRIPS_SUCCESED,
  SET_ACTIVE_TAGS
} from "./constants";

const initialState: IMultiTripsAndTagsType = {
  trips: [],
  activeTags: []
};

const TripBrowserReducer = (
  state = initialState,
  action: TripBrowserAction
) => {
  switch (action.type) {
    case FETCH_TRIPS_SUCCESED:
      return { ...state, trips: action.trips };
    case FILTER_TRIPS:
      return state;
    case SET_ACTIVE_TAGS:
    default:
      return state;
  }
};

export default TripBrowserReducer;
