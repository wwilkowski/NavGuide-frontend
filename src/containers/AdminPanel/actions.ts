import * as constants from './constants';
import * as types from './types';

export const getGuideRequestsRequest = () => ({
  type: constants.GET_GUIDE_REQUESTS
});

export const getGuideRequestsSuccessed = (guideRequests: types.IGuideRequest[]) => ({
  type: constants.GET_GUIDE_REQUESTS_SUCCESSED,
  guideRequests
});

export const getGuideRequestsFailed = (message: string) => ({
  type: constants.GET_GUIDE_REQUESTS_FAILED,
  message
});
