import { IRateOfferFormValues } from '../RateOfferForm/types';

export interface IRateOfferPopupProps {
  popupVisible: boolean;
  changePopupVisible: () => void;
  onSubmit: (feedback: IRateOfferFormValues) => void;
  offerId: number;
}
