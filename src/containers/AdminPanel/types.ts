import * as constants from './constants';

export interface IGuideRequest {
  id: number;
  date: string;
  description: string;
  languages: string[];
  message: string;
  status: string;
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

export type AdminPanelAction = IGetGuideRequestsSuccessed | IGetGuideRequestsFailed;
