import {
  FETCH_RANDOM_TRIPS_REQUESTED,
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_RANDOM_TRIPS_FAILED,
  FETCH_CITY_TRIPS_REQUESTED,
  FETCH_CITY_TRIPS_SUCCESED,
  FETCH_CITY_TRIPS_FAILED,
  FETCH_GEO_TRIPS_REQUESTED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_GEO_TRIPS_FAILED,
  FETCH_TAGS_REQUESTED,
  FETCH_TAGS_SUCCESED,
  FETCH_TAGS_FAILED,
  FETCH_SUGGESTED_CITIES_REQUESTED,
  FETCH_SUGGESTED_CITIES_SUCCESED,
  FETCH_SUGGESTED_CITIES_FAILED,
  FETCH_GUIDE_PROFILE_REQUESTED,
  FETCH_GUIDE_PROFILE_FAILED,
  FETCH_GUIDE_PROFILE_DATA_REQUESTED,
  FETCH_GUIDE_PROFILE_DATA_SUCCESSED,
  FETCH_GUIDE_PROFILE_DATA_FAILED,
  FETCH_GUIDE_PROFILE_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED,
  FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_FAILED,
  FETCH_GUIDE_HISTORY_REQUESTED,
  FETCH_GUIDE_HISTORY_SUCCESSED,
  FETCH_GUIDE_HISTORY_FAILED
} from './constants';
import { IMultiTripsType, ITag, ISuggestedPlace, IGuideProfile, ISingleTripType, IEndedSingleTripType } from './types';
import { IUserProfile } from '../User/types';

//RANDOM TRIPS
export const fetchRandomTripsRequested = (isLogged: boolean) => ({
  type: FETCH_RANDOM_TRIPS_REQUESTED,
  isLogged
});

export const fetchRandomTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_RANDOM_TRIPS_SUCCESED,
  trips
});

export const fetchRandomTripsFailed = (message: string) => ({
  type: FETCH_RANDOM_TRIPS_FAILED,
  message
});

//CITY TRIPS
export const fetchCityTripsRequested = (city: string) => ({
  type: FETCH_CITY_TRIPS_REQUESTED,
  city: city
});

export const fetchCityTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_CITY_TRIPS_SUCCESED,
  trips
});

export const fetchCityTripsFailed = (message: string) => ({
  type: FETCH_CITY_TRIPS_FAILED,
  message
});

//GEO TRIPS
export const fetchGeoTripsRequested = (lat: number, lon: number, radius: number, isLogged: boolean) => ({
  type: FETCH_GEO_TRIPS_REQUESTED,
  lat,
  lon,
  radius,
  isLogged
});

export const fetchGeoTripsSuccesed = (trips: IMultiTripsType) => ({
  type: FETCH_GEO_TRIPS_SUCCESED,
  trips
});

export const fetchGeoTripsFailed = (message: string) => ({
  type: FETCH_GEO_TRIPS_FAILED,
  message
});

//TAGS
export const fetchTagsRequested = () => ({
  type: FETCH_TAGS_REQUESTED
});

export const fetchTagsSuccesed = (tags: ITag[]) => ({
  type: FETCH_TAGS_SUCCESED,
  tags
});

export const fetchTagsFailed = (message: string) => ({
  type: FETCH_TAGS_FAILED,
  message
});

//SUGGESTED CITIES
export const fetchSuggestedCitiesRequested = (location: string, number: number) => ({
  type: FETCH_SUGGESTED_CITIES_REQUESTED,
  location,
  number
});

export const fetchSuggestedCitiesSuccesed = (places: ISuggestedPlace) => ({
  type: FETCH_SUGGESTED_CITIES_SUCCESED,
  suggestedPlaces: places
});

export const fetchSuggestedCitiesFailed = (message: string) => ({
  type: FETCH_SUGGESTED_CITIES_FAILED,
  message
});

//GUIDE PROFILE
export const fetchGuideProfileRequested = (id: number) => ({
  type: FETCH_GUIDE_PROFILE_REQUESTED,
  id
});

export const fetchGuideProfileSuccessed = (guideProfile: IGuideProfile) => ({
  type: FETCH_GUIDE_PROFILE_SUCCESSED,
  guideProfile
});

export const fetchGuideProfileFailed = (message: string) => ({
  type: FETCH_GUIDE_PROFILE_FAILED,
  message
});

//GUIDE PROFILE DATA
export const fetchGuideProfileDataRequest = (id: number) => ({
  type: FETCH_GUIDE_PROFILE_DATA_REQUESTED,
  id
});

export const fetchGuideProfileDataSuccessed = (guideProfileData: IUserProfile) => ({
  type: FETCH_GUIDE_PROFILE_DATA_SUCCESSED,
  guideProfileData
});

export const fetchGuideProfileDataFailed = (message: string) => ({
  type: FETCH_GUIDE_PROFILE_DATA_FAILED,
  message
});

//GUIDE ACTIVE OFFERS
export const fetchGuideActiveOffersRequest = (id: number) => ({
  type: FETCH_GUIDE_ACTIVE_OFFERS_REQUESTED,
  id
});

export const fetchGuideActiveOffersSuccessed = (activeOffers: ISingleTripType[]) => ({
  type: FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED,
  activeOffers
});

export const fetchGuideActiveOffersFailed = (message: string) => ({
  type: FETCH_GUIDE_ACTIVE_OFFERS_FAILED,
  message
});

//GUIDE HISTORY OFFERS
export const fetchGuideHistoryRequest = (id: number) => ({
  type: FETCH_GUIDE_HISTORY_REQUESTED,
  id
});

export const fetchGuideHistorySuccessed = (historyOffers: IEndedSingleTripType[]) => ({
  type: FETCH_GUIDE_HISTORY_SUCCESSED,
  historyOffers
});

export const fetchGuideHistoryFailed = (message: string) => ({
  type: FETCH_GUIDE_HISTORY_FAILED,
  message
});
