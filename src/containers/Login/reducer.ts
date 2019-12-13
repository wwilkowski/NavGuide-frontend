import * as constrants from './constants';
import * as types from './types';

const initialState = {
  user: {},
  isLoggedIn: false
};

const RegistrationReducer = (state = initialState, action: types.ILogInSuccessedAction) => {
  switch (action.type) {
    case constrants.LOG_IN_GOOGLE_SUCCESSED:
      return {
        user: action.user,
        isLoggedIn: true
      };
    case constrants.LOG_OUT_GOOGLE_SUCCESSED:
      return {
        user: {},
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
