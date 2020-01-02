import * as constants from './constants';
import * as types from './types';

const initialState: types.IRegisterStore = {
  templateUser: {
    avatar: '',
    role: '',
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    telephone: '',
    gender: '',
    experience: '',
    interests: []
  },
  registrationInProgress: false,
  registrationToken: '',
  toBeGuide: false,
  interests: []
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
    default:
      return state;
  }
};

export default RegistrationReducer;
