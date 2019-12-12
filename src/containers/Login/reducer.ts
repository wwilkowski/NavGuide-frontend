import { LOG_IN_GOOGLE_SUCCESSED } from './constants';
import { LogInSuccessedAction, UserDataType } from './types';

const initialState = {
  user: {},
  isLoggedIn: false
};

const RegistrationReducer = (state = initialState, action: LogInSuccessedAction) => {
  switch (action.type) {
    case LOG_IN_GOOGLE_SUCCESSED:
      return {
        user: action.user,
        isLoggedIn: true
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
