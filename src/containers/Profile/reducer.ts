import * as constrants from './constants';
import * as types from './types';

const initialState = {
  firstName: ''
};

const ProfileReducer = (state = initialState, action: types.ITempRSuccessed) => {
  switch (action.type) {
    case constrants.TEMP_SUCCESSED:
      return {
        firstName: action.firstName
      };
    default:
      return state;
  }
};

export default ProfileReducer;
