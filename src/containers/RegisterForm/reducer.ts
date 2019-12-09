import { SIGN_UP_USER_SUCCESSED } from './constants';
import { UserInfoType, SignUpUserSuccessedAction } from './types';

const initialState: UserInfoType = {
  name: '',
  surname: '',
  logged: false
};

const UserInfoReducer = (state = initialState, action: SignUpUserSuccessedAction) => {
  switch (action.type) {
    case SIGN_UP_USER_SUCCESSED:
      return {
        ...action.user
      };
    default:
      return state;
  }
};

export default UserInfoReducer;
