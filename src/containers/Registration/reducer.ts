import { SIGN_UP_GOOGLE_SUCCESSED } from './constants';
import { ISignUpGoogleSuccessedAction, IRegisterStore } from './types';

const initialState: IRegisterStore = {
  user: {
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    tel: '',
    gender: '',
    experience: 1
  },
  registrationInProgress: false,
  registrationToken: ''
};

const RegistrationReducer = (state = initialState, action: ISignUpGoogleSuccessedAction) => {
  switch (action.type) {
    case SIGN_UP_GOOGLE_SUCCESSED:
      return {
        user: action.user,
        registrationInProgress: true,
        registrationToken: action.registerToken
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
