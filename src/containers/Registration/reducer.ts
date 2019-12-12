import { SIGN_UP_GOOGLE_USER_SUCCESSED } from './constants';
import { SignUpUserSuccessedAction, RegistrationDataType } from './types';

const initialState: RegistrationDataType = {
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

const RegistrationReducer = (state = initialState, action: SignUpUserSuccessedAction) => {
  switch (action.type) {
    case SIGN_UP_GOOGLE_USER_SUCCESSED:
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
