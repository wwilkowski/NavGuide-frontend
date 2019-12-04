import { ADD_USER, FETCH_USERS_SUCCESSED } from './constants';
import { usersActionType, UserState } from './types';

const initialState: UserState = {
  users: []
};

const Example2Data = (state = initialState, action: usersActionType): UserState => {
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, { username: action.username }]
      };
    case FETCH_USERS_SUCCESSED:
      return {
        users: action.users
      };
    default:
      return state;
  }
};

export default Example2Data;
