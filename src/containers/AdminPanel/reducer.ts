import * as types from './types';
import * as constants from './constants';

const initialState: types.IMultiGuideRequests = {
  guideRequests: []
};

const AdminPanelReducer = (state = initialState, action: types.AdminPanelAction) => {
  switch (action.type) {
    case constants.GET_GUIDE_REQUESTS_SUCCESSED:
      return { guideRequests: action.guideRequests };
    case constants.GET_GUIDE_REQUESTS_FAILED:
      console.log(action.message);
      return state;
    default:
      return state;
  }
};

export default AdminPanelReducer;
