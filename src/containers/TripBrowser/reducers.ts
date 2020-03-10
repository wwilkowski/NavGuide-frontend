import { TripBrowserAction, IMultiTripsAndTagsType, GuideProfileAction, IGuideProfileComplete } from './types';
import {
  FETCH_RANDOM_TRIPS_SUCCESED,
  FETCH_TAGS_SUCCESED,
  FETCH_CITY_TRIPS_SUCCESED,
  FETCH_GEO_TRIPS_SUCCESED,
  FETCH_SUGGESTED_CITIES_SUCCESED,
  FETCH_GUIDE_PROFILE_SUCCESSED,
  FETCH_GUIDE_PROFILE_FAILED,
  FETCH_GUIDE_PROFILE_DATA_SUCCESSED,
  FETCH_GUIDE_PROFILE_DATA_FAILED,
  FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED,
  FETCH_GUIDE_ACTIVE_OFFERS_FAILED,
  FETCH_GUIDE_HISTORY_FAILED,
  FETCH_GUIDE_HISTORY_SUCCESSED
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

//GUIDE PROFILE
const initialGuideState: IGuideProfileComplete = {
  guideProfile: { languages: [], lastName: '', firstName: '', guideId: -1, userId: -1, experience: -1, averageMark: '' },
  guideProfileData: {
    age: -1,
    avatar: '',
    country: '',
    email: '',
    experience: 1,
    firstName: '',
    gender: '',
    id: -1,
    interests: [
      {
        id: -1,
        name: ''
      }
    ],
    lastName: '',
    role: '',
    telephone: ''
  },
  activeOffers: [
    {
      averageMark: -1,
      city: '',
      description: '',
      id: -1,
      lat: -1,
      lon: -1,
      maxPeople: -1,
      name: '',
      owner: {
        experience: -1,
        firstName: '',
        guideId: -1,
        languages: [''],
        lastName: '',
        userId: -1
      },
      photos: [''],
      price: -1,
      priceType: '',
      radius: -1,
      sold: -1,
      tags: [{ id: -1, name: '' }]
    }
  ],
  historyOffers: [
    {
      date: '',
      offer: {
        averageMark: -1,
        city: '',
        description: '',
        id: -1,
        lat: -1,
        lon: -1,
        maxPeople: -1,
        name: '',
        owner: {
          experience: -1,
          firstName: '',
          guideId: -1,
          languages: [''],
          lastName: '',
          userId: -1
        },
        photos: [''],
        price: -1,
        priceType: '',
        radius: -1,
        sold: -1,
        tags: [{ id: -1, name: '' }]
      }
    }
  ]
};

const GuideProfileReducer = (state = initialGuideState, action: GuideProfileAction) => {
  switch (action.type) {
    case FETCH_GUIDE_PROFILE_SUCCESSED:
      return { ...state, guideProfile: action.guideProfile };
    case FETCH_GUIDE_PROFILE_DATA_SUCCESSED:
      return { ...state, guideProfileData: action.guideProfileData };
    case FETCH_GUIDE_ACTIVE_OFFERS_SUCCESSED:
      return { ...state, activeOffers: action.activeOffers };
    case FETCH_GUIDE_HISTORY_SUCCESSED:
      return { ...state, historyOffers: action.historyOffers };

    case FETCH_GUIDE_PROFILE_DATA_FAILED:
      console.log(action.message);
      return state;
    case FETCH_GUIDE_PROFILE_FAILED:
      console.log(action.message);
      return state;
    case FETCH_GUIDE_ACTIVE_OFFERS_FAILED:
      console.log(action.message);
      return state;
    case FETCH_GUIDE_HISTORY_FAILED:
      console.log(action.message);
      return state;

    default:
      return state;
  }
};

export { TripBrowserReducer, GuideProfileReducer };
