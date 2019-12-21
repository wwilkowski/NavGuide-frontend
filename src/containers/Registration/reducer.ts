import * as constants from './constants';
import * as types from './types';

const initialState: types.IRegisterStore = {
  user: {
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    telephone: '',
    gender: '',
    experience: ''
  },
  registrationInProgress: false,
  registrationToken: '',
  interests: []
};

const RegistrationReducer = (state = initialState, action: types.ISignUpActionType) => {
  switch (action.type) {
    case constants.SIGN_UP_GOOGLE_SUCCESSED:
      return {
        ...state,
        user: action.user,
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
