import * as constants from './constants';
import * as types from './types';

const initialState: types.IRegisterStore = {
  templateUser: {
    id: -1,
    avatar: '',
    role: '',
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    telephone: '',
    age: 0,
    gender: '',
    experience: 1,
    interests: []
  },
  registrationInProgress: false,
  registrationToken: '',
  toBeGuide: false,
  interests: [],
  guideRequests: []
};

const RegistrationReducer = (state = initialState, action: types.ISignUpActionType) => {
  switch (action.type) {
    case constants.SIGN_UP_GOOGLE_SUCCESSED:
      return {
        ...state,
        templateUser: action.templateUser,
        registrationInProgress: true,
        registrationToken: action.registerToken
      };
    case constants.GET_INTERESTS_SUCCESSED:
      return {
        ...state,
        interests: action.interests
      };
    case constants.GET_GUIDE_INFO_SUCCESSED:
      return {
        ...state,
        guideRequests: action.requests
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
