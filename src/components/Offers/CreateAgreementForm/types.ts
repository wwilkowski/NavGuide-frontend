export interface ICreateAgreementFormValues {
  offerId: number;
  description: string;
  userId: number;
  plannedDate: Date;
  price: number;
}

export interface ICreateAgreementOtherProps {
  purchasePlannedDate: Date;
  tripBegin: Date;
  tripEnd: Date;
  propOfferId: number;
  propUserId: number;
  createAgreementClick: (description: string, plannedDate: Date, price: number) => void;
  createAgreementCancel: () => void;
}
