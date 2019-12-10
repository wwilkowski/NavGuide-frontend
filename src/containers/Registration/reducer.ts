import { SIGN_UP_GOOGLE_USER_SUCCESSED } from './constants';
import { UserDataType, SignUpUserSuccessedAction } from './types';

const initialState: UserDataType = {
  firstName: '',
  lastName: '',
  country: '',
  email: '',
  tel: '',
  gender: '',
  experience: 1,
  registrationInProgress: false
};

const UserInfoReducer = (state = initialState, action: SignUpUserSuccessedAction) => {
  switch (action.type) {
    case SIGN_UP_GOOGLE_USER_SUCCESSED:
      return {
        ...action.user,
        registrationInProgress: true
      };
    default:
      return state;
  }
};

export default UserInfoReducer;
