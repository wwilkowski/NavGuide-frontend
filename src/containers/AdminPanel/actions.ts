import * as constants from './constants';
import * as types from './types';
import { ISettleGuideRequestFormValues } from '../../components/AdminPanel/types';

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

export const settleGuideRequest = (data: ISettleGuideRequestFormValues) => ({
  type: constants.SETTLE_GUIDE_REQUEST,
  data
});

export const settleGuideRequestSuccessed = () => ({
  type: constants.SETTLE_GUIDE_REQUEST_SUCCESSED
});

export const settleGuideRequestFailed = (message: string) => ({
  type: constants.SETTLE_GUIDE_REQUEST_FAILED,
  message
});
