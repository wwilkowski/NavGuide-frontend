import {
  FETCH_TRIPS_REQUESTED,
  FETCH_TRIPS_SUCCESED,
  FETCH_TRIPS_FAILED,
  SET_ACTIVE_TAGS,
  FETCH_TAGS_REQUESTED,
  FETCH_TAGS_SUCCESED,
  FETCH_TAGS_FAILED
} from "./constants";
import {
  IMultiTripsType,
  IMultiTripsAndTagsType,
  ISingleTripType,
  ITag
} from "./types";

export const fetchTripsRequested = () => ({
  type: FETCH_TRIPS_REQUESTED
});

export const fetchTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_TRIPS_SUCCESED,
  trips
});

export const fetchTripsFailed = (message: string) => ({
  type: FETCH_TRIPS_FAILED,
  message
});

export const fetchTagsRequested = () => ({
  type: FETCH_TAGS_REQUESTED
});

export const fetchTagsSuccesed = (tags: ITag[]) => ({
  type: FETCH_TAGS_SUCCESED,
  tags
})

export const fetchTagsFailed = (message: string) => ({
  type: FETCH_TAGS_FAILED,
  message
})

export const setActiveTags = (tags: string[]) => ({
  type: SET_ACTIVE_TAGS,
  tags
});
