import * as types from '../../containers/AdminPanel/types';

export interface IListGuideRequestProps {
  guideRequests: types.IGuideRequest[];
}

export interface ISettleGuideRequestFormValues {
  id: number;
  status: string;
  message: string;
}

export interface ISettleGuideRequestFormProps {
  onSubmit: (data: ISettleGuideRequestFormValues) => void;
}
