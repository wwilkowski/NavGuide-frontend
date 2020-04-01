import * as constrants from './constants';

const initialState = {
  isLoggedIn: false,
  historyOffers: [],
  user: {}
};

const ProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case constrants.LOG_IN_GOOGLE_SUCCESSED:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case constrants.LOG_OUT_GOOGLE_SUCCESSED:
      return {
        user: {},
        historyOffers: [],
        isLoggedIn: false
      };

    case constrants.EDIT_PROFILE_SUCCESSED:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case constrants.GET_PROFILE_SUCCESSED:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case constrants.GET_PROFILE_FAILED:
      return {
        ...state,
        user: {},
        isLoggedIn: false
      };

    case constrants.GET_PROFILE_HISTORY_OFFERS_SUCCESSED:
      return {
        ...state,
        historyOffers: action.trips
      };

    case constrants.GET_OWN_FEEDBACKS_SUCCESSED:
      return {
        ...state,
        feedbacks: action.feedbacks
      };

    default:
      return state;
  }
};

export default ProfileReducer;
