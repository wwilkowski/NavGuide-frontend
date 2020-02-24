import { TripBrowserAction, IMultiTripsAndTagsType, IGuideProfile, GuideProfileAction } from './types';
import {
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_TAGS_SUCCESED,
  FETCH_CITY_TRIPS_SUCCESED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_SUGGESTED_CITIES_SUCCESED,
  FETCH_GUIDE_PROFILE_SUCCESSED,
  FETCH_GUIDE_PROFILE_FAILED
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
    case FETCH_CITY_TRIPS_SUCCESED:
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

const initialGuideState: IGuideProfile = {
  firstName: '',
  id: -1,
  languages: [],
  lastName: ''
};

const GuideProfileReducer = (state = initialGuideState, action: GuideProfileAction) => {
  switch (action.type) {
    case FETCH_GUIDE_PROFILE_SUCCESSED:
      return action.guideProfile;
    case FETCH_GUIDE_PROFILE_FAILED:
      console.log(action.message);
    default:
      return state;
  }
};

export { TripBrowserReducer, GuideProfileReducer };
