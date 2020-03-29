import { IAgreementOffer } from '../../../containers/Offers/types';

export interface IAgreementTravelerProps {
  currentAgreement: IAgreementOffer;
  handleSettleAgreement: (id: number, status: string) => void;
}
