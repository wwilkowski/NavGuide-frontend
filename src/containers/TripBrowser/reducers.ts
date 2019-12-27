import { TripBrowserAction, IMultiTripsAndTagsType } from "./types";
import {
  FETCH_TRIPS_SUCCESED,
  SET_ACTIVE_TAGS,
  FETCH_TAGS_SUCCESED
} from "./constants";

const initialState: IMultiTripsAndTagsType = {
  trips: [],
  tags: []
};

const TripBrowserReducer = (
  state = initialState,
  action: TripBrowserAction
) => {
  switch (action.type) {
    case FETCH_TRIPS_SUCCESED:
      return { ...state, trips: action.trips.trips };
    case FETCH_TAGS_SUCCESED:
      return { ...state, tags: action.tags };
    case SET_ACTIVE_TAGS:
      return { ...state, activeTags: action.tags };
    default:
      return state;
  }
};

export default TripBrowserReducer;
