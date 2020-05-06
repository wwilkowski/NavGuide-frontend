import * as types from '../../containers/AdminPanel/types';
import { IUserProfile } from '../../containers/User/types';

export interface IGuideRequestProps {
  guideRequest: types.IGuideRequest;
  userProfile: IUserProfile;
}

export interface IListGuideRequestProps {
  guideRequests: types.IGuideRequest[];
  onSubmitForm: (data: ISettleGuideRequestFormValues) => void;
}

export interface ISettleGuideRequestFormValues {
  id: number;
  status: string;
  message: string;
}

export interface ISettleGuideRequestFormProps {
  onSubmit: (data: ISettleGuideRequestFormValues) => void;
  requestId: number;
}
