import { IMultiTripsType, ISingleTripType, TripBrowserAction } from "./types";
import { FILTER_TRIPS, FETCH_TRIPS_SUCCESED } from "./constants";

const initialState: IMultiTripsType = {
  trips: []
};

const TripBrowserReducer = (
  state = initialState,
  action: TripBrowserAction
) => {
  switch (action.type) {
    case FETCH_TRIPS_SUCCESED:
      return action.trips;
    case FILTER_TRIPS:
      return state;
    default:
      return state;
  }
};

export default TripBrowserReducer;
