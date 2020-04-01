import { ISingleTripType } from '../../containers/TripBrowser/types';

export interface ICreateAgreementFormValues {
  offerId: number;
  description: string;
  userId: number;
  plannedDate: Date;
  price: number;
}

export interface ICreateAgreementOtherProps {
  trip: ISingleTripType;
  purchasePlannedDate: Date;
  propOfferId: number;
  propUserId: number;
  createAgreementClick: (description: string, plannedDate: Date, price: number) => void;
  createAgreementCancel: () => void;
}
