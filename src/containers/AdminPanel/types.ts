import * as constants from './constants';
import { ISettleGuideRequestFormValues } from '../../components/AdminPanel/types';

export interface IGuideRequest {
  id: number;
  date: string;
  description: string;
  languages: string[];
  message: string;
  status: string;
  experience: number;
  userId: number;
}

export interface IMultiGuideRequests {
  guideRequests: IGuideRequest[];
}

export interface IGetGuideRequests {
  type: typeof constants.GET_GUIDE_REQUESTS;
}

export interface IGetGuideRequestsSuccessed {
  type: typeof constants.GET_GUIDE_REQUESTS_SUCCESSED;
  guideRequests: IGuideRequest[];
}

export interface IGetGuideRequestsFailed {
  type: typeof constants.GET_GUIDE_REQUESTS_FAILED;
  message: string;
}

export interface ISettleGuideRequest {
  type: typeof constants.SETTLE_GUIDE_REQUEST;
  data: ISettleGuideRequestFormValues;
}

export interface ISettleGuideRequestSuccessed {
  type: typeof constants.SETTLE_GUIDE_REQUEST_SUCCESSED;
}

export interface ISettleGuideRequestFailed {
  type: typeof constants.SETTLE_GUIDE_REQUEST_FAILED;
  message: string;
}

export type AdminPanelAction =
  | IGetGuideRequestsSuccessed
  | IGetGuideRequestsFailed
  | ISettleGuideRequest
  | ISettleGuideRequestFailed
  | ISettleGuideRequestSuccessed;
