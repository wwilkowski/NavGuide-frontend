import * as types from './types';
import * as constants from './constants';

const initialState: types.IUserProfiles = {
  users: []
};

const ProfileReducer = (state = initialState, action: types.ProfileAction) => {
  switch (action.type) {
    case constants.CLEAN_USER_PROFILES:
      return { users: [] };
    case constants.FETCH_USER_PROFILE_SUCCESED:
      return { users: state.users.concat(action.user) };
    case constants.FETCH_USER_PROFILE_FAILED:
      console.log(action.message);
      break;
    default:
      return state;
  }
};

export default ProfileReducer;
